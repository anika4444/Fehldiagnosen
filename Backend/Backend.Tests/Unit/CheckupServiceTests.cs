using System.Net;
using System.Text.Json;
using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.CheckupService;
using Backend.Application.Services.CheckupService.Dto;
using Backend.Domain.Entities;
using Backend.Domain.Enums;
using Microsoft.Extensions.Configuration;
using Moq;

namespace Backend.Tests.Unit;

public class CheckupServiceTests
{
    private const int PatientId = 1;
    private const string OwnerUserId = "owner";
    private const string AiEndpoint = "http://ai.test/ai/checkup-summary";

    private static readonly DateTime From = new(2026, 1, 1);
    private static readonly DateTime To = new(2026, 3, 31);

    private readonly Mock<IPatientRepository> _patientRepository = new();
    private readonly Mock<IDiagnosisRepository> _diagnosisRepository = new();
    private readonly Mock<IMedicationRepository> _medicationRepository = new();
    private readonly Mock<IPatientSymptomRepository> _symptomRepository = new();
    private readonly Mock<ICommunicationLevelRepository> _communicationLevelRepository = new();
    private readonly FakeHttpHandler _aiHandler = new();
    private readonly CheckupService _service;

    public CheckupServiceTests()
    {
        _patientRepository.Setup(r => r.FindByIdAsync(PatientId))
            .ReturnsAsync(new Patient { Id = PatientId, UserId = OwnerUserId, CommunicationLevelId = 2 });
        _communicationLevelRepository.Setup(r => r.GetAllAsync())
            .ReturnsAsync([
                new CommunicationLevel { Id = 1, Name = "L1", KiPrompt = "einfach" },
                new CommunicationLevel { Id = 2, Name = "L2", KiPrompt = "mittel" }
            ]);
        _diagnosisRepository.Setup(r => r.FindAllByPatientIdAsync(PatientId)).ReturnsAsync([]);
        _medicationRepository.Setup(r => r.FindAllByPatientIdAsync(PatientId)).ReturnsAsync([]);
        _symptomRepository.Setup(r => r.FindAllByPatientIdAsync(PatientId)).ReturnsAsync([]);

        var httpClientFactory = new Mock<IHttpClientFactory>();
        httpClientFactory.Setup(f => f.CreateClient(It.IsAny<string>())).Returns(() => new HttpClient(_aiHandler));

        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["AiServiceOptions:CheckupSummaryEndpoint"] = AiEndpoint
            })
            .Build();

        _service = new CheckupService(
            _patientRepository.Object,
            _diagnosisRepository.Object,
            _medicationRepository.Object,
            _symptomRepository.Object,
            _communicationLevelRepository.Object,
            httpClientFactory.Object,
            configuration);
    }

    private Task<ServiceResult<CheckupSummaryResponse>> Generate(string? userId = OwnerUserId) =>
        _service.GenerateCheckupSummary(PatientId, userId, new CheckupSummaryRequest { From = From, To = To });

    private static Medication Medication(int id, DateTime? start, int durationInDays) => new()
    {
        Id = id,
        PatientId = PatientId,
        Name = $"Medikament {id}",
        IntakeStartDate = start,
        DurationInDays = durationInDays
    };

    #region Zugriff

    [Fact]
    public async Task UnknownPatient_ReturnsNotFound()
    {
        var result = await _service.GenerateCheckupSummary(99, OwnerUserId, new CheckupSummaryRequest { From = From, To = To });

        Assert.Equal(ServiceErrorType.NotFound, result.ErrorType);
    }

    [Fact]
    public async Task ForeignUser_ReturnsForbidden()
    {
        var result = await Generate("someone-else");

        Assert.Equal(ServiceErrorType.Forbidden, result.ErrorType);
        Assert.Null(_aiHandler.LastRequestBody);
    }

    [Fact]
    public async Task Doctor_WithoutUserId_HasAccess()
    {
        var result = await Generate(userId: null);

        Assert.True(result.IsSuccess);
    }

    #endregion

    #region Zeitraum-Filter

    [Fact]
    public async Task Diagnoses_OnlyInsideRange_IncludingBoundaries()
    {
        _diagnosisRepository.Setup(r => r.FindAllByPatientIdAsync(PatientId)).ReturnsAsync([
            new Diagnosis { Id = 1, Title = "davor", DiagnosisDate = From.AddDays(-1) },
            new Diagnosis { Id = 2, Title = "Start", DiagnosisDate = From },
            new Diagnosis { Id = 3, Title = "mitten", DiagnosisDate = new DateTime(2026, 2, 15), ConditionStatus = ConditionStatus.Chronical, IcdCode = "E11", Note = "Notiz" },
            new Diagnosis { Id = 4, Title = "Ende", DiagnosisDate = To },
            new Diagnosis { Id = 5, Title = "danach", DiagnosisDate = To.AddDays(1) }
        ]);

        var result = await Generate();

        Assert.Equal([2, 3, 4], result.Data!.Diagnoses.Select(d => d.Id));

        var mapped = result.Data.Diagnoses.Single(d => d.Id == 3);
        Assert.Equal("mitten", mapped.Diagnosis);
        Assert.Equal("E11", mapped.ICD10Code);
        Assert.Equal(2026, mapped.Year);
        Assert.Equal("Chronical", mapped.Status);
        Assert.Equal("Notiz", mapped.Comment);
    }

    [Fact]
    public async Task Symptoms_OnlyInsideRange()
    {
        _symptomRepository.Setup(r => r.FindAllByPatientIdAsync(PatientId)).ReturnsAsync([
            new PatientSymptom { Id = 1, OccurrenceTime = From.AddTicks(-1) },
            new PatientSymptom { Id = 2, OccurrenceTime = From.AddHours(5) },
            new PatientSymptom { Id = 3, OccurrenceTime = To.AddTicks(1) }
        ]);

        var result = await Generate();

        Assert.Equal([2], result.Data!.Symptoms.Select(s => s.Id));
    }

    [Fact]
    public async Task Medications_OverlappingRange_AreIncluded()
    {
        _medicationRepository.Setup(r => r.FindAllByPatientIdAsync(PatientId)).ReturnsAsync([
            Medication(1, start: null, durationInDays: 10),                     // ohne Startdatum
            Medication(2, start: From.AddDays(-30), durationInDays: 10),        // vor dem Zeitraum beendet
            Medication(3, start: From.AddDays(-30), durationInDays: 60),        // läuft in den Zeitraum hinein
            Medication(4, start: new DateTime(2026, 2, 1), durationInDays: 7),  // komplett im Zeitraum
            Medication(5, start: From.AddDays(-100), durationInDays: 0),        // Dauer 0 => EndDate == Start, vorher beendet
            Medication(6, start: To.AddDays(1), durationInDays: 30),            // beginnt erst nach dem Zeitraum
            Medication(7, start: To, durationInDays: 30),                       // beginnt am letzten Tag
            Medication(8, start: From.AddDays(-10), durationInDays: 10)         // endet genau am ersten Tag
        ]);

        var result = await Generate();

        Assert.Equal([3, 4, 7, 8], result.Data!.Medications.Select(m => m.Id));
    }

    #endregion

    #region KI-Aufruf

    [Fact]
    public async Task AiSummary_IsTakenFromAiResponse()
    {
        _aiHandler.ResponseBody = """{ "summary": "Alles im grünen Bereich" }""";

        var result = await Generate();

        Assert.Equal("Alles im grünen Bereich", result.Data!.AiSummary);
        Assert.Equal(AiEndpoint, _aiHandler.LastRequestUri?.ToString());
    }

    [Fact]
    public async Task AiPayload_ContainsCommunicationLevelOfPatient_AndFilteredData()
    {
        _diagnosisRepository.Setup(r => r.FindAllByPatientIdAsync(PatientId)).ReturnsAsync([
            new Diagnosis { Id = 1, Title = "im Zeitraum", DiagnosisDate = new DateTime(2026, 2, 1) },
            new Diagnosis { Id = 2, Title = "ausserhalb", DiagnosisDate = new DateTime(2025, 2, 1) }
        ]);

        await Generate();

        using var payload = JsonDocument.Parse(_aiHandler.LastRequestBody!);
        Assert.Equal("L2", payload.RootElement.GetProperty("langLevel").GetString());
        Assert.Equal("mittel", payload.RootElement.GetProperty("kiPrompt").GetString());
        var diagnosis = Assert.Single(payload.RootElement.GetProperty("diagnoses").EnumerateArray());
        Assert.Equal("im Zeitraum", diagnosis.GetProperty("diagnosis").GetString());
    }

    [Fact]
    public async Task AiPayload_FallsBackToFirstCommunicationLevel()
    {
        _patientRepository.Setup(r => r.FindByIdAsync(PatientId))
            .ReturnsAsync(new Patient { Id = PatientId, UserId = OwnerUserId, CommunicationLevelId = null });

        await Generate();

        using var payload = JsonDocument.Parse(_aiHandler.LastRequestBody!);
        Assert.Equal("L1", payload.RootElement.GetProperty("langLevel").GetString());
    }

    [Fact]
    public async Task AiServiceError_ReturnsFallbackText()
    {
        _aiHandler.StatusCode = HttpStatusCode.InternalServerError;

        var result = await Generate();

        Assert.True(result.IsSuccess);
        Assert.Equal("AI-Summary aktuell nicht verfügbar.", result.Data!.AiSummary);
    }

    [Fact]
    public async Task AiResponseWithoutSummary_ReturnsFallbackText()
    {
        _aiHandler.ResponseBody = """{ "other": "x" }""";

        var result = await Generate();

        Assert.Equal("AI-Summary konnte nicht erstellt werden.", result.Data!.AiSummary);
    }

    [Fact]
    public async Task AiServiceUnreachable_ReturnsFallbackText()
    {
        _aiHandler.ExceptionToThrow = new HttpRequestException("Connection refused");

        var result = await Generate();

        Assert.True(result.IsSuccess);
        Assert.Equal("AI-Summary aktuell nicht erreichbar.", result.Data!.AiSummary);
    }

    #endregion

    private sealed class FakeHttpHandler : HttpMessageHandler
    {
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.OK;
        public string ResponseBody { get; set; } = """{ "summary": "ok" }""";
        public Exception? ExceptionToThrow { get; set; }
        public string? LastRequestBody { get; private set; }
        public Uri? LastRequestUri { get; private set; }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            LastRequestUri = request.RequestUri;
            LastRequestBody = request.Content is null ? null : await request.Content.ReadAsStringAsync(cancellationToken);

            if (ExceptionToThrow is not null)
                throw ExceptionToThrow;

            return new HttpResponseMessage(StatusCode) { Content = new StringContent(ResponseBody) };
        }
    }
}
