using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.DiagnosisService;
using System.Text.Json;

namespace Backend.Application.Services.AIService
{
    public class AIService : IAIService
    {
        private readonly IPatientRepository _patientRepository;

        private readonly IDiagnosisRepository _diagnosisRepository;

        private readonly ICommunicationLevelRepository _communicationLevelRepository;
        private readonly IDiagnosisService _diagnosisService;
        private readonly IHttpClientFactory _httpClientFactory;

        private readonly string _explanationEndpoint;
        private readonly string _interpretEndpoint;
        private readonly string _medicationScanEndpoint;

        public AIService(IPatientRepository patientRepository, IDiagnosisRepository diagnosisRepository, ICommunicationLevelRepository communicationLevelRepository, IHttpClientFactory httpClientFactory, IConfiguration configuration, IDiagnosisService diagnosisService)
        {
            _patientRepository = patientRepository;
            _diagnosisRepository = diagnosisRepository;
            _communicationLevelRepository = communicationLevelRepository;
            _httpClientFactory = httpClientFactory;
            _diagnosisService = diagnosisService;
            _explanationEndpoint = configuration["AiServiceOptions:ExplanationEndpoint"] ?? string.Empty;
            _interpretEndpoint = configuration["AiServiceOptions:InterpretEndpoint"] ?? string.Empty;
        }

        public async Task<ServiceResult<AiExplainResponse>> ExplainDiagnosis(int id, string? userId, int diagnosisId)
        {
            var diagnosis = await _diagnosisRepository.FindByIdAsync(diagnosisId);

            if (diagnosis == null)
            {
                return ServiceResult<AiExplainResponse>.NotFound($"Diagnose mit ID {diagnosisId} nicht gefunden");
            }

            var patient = await _patientRepository.FindByIdAsync(diagnosis.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
            {
                return ServiceResult<AiExplainResponse>.Forbidden("Kein Zugriff auf diese Diagnose.");
            }

            var communicationLevels = await _communicationLevelRepository.GetAllAsync();

            var communicationLevel = communicationLevels?.ToList()?.FirstOrDefault(level => level.Id == patient?.CommunicationLevel?.Id)
                         ?? communicationLevels?.ToList()?.FirstOrDefault();

            // Mapping Diagnose-Entität -> Node.js /ai/explain API
            var payload = new {
                langLevel = communicationLevel?.Name ?? "L1",
                kiPrompt = communicationLevel?.KiPrompt ?? "",
                diagnosis = diagnosis.Title,
                icd10Code = diagnosis.IcdCode ?? string.Empty,
                year = diagnosis.DiagnosisDate.Year,
                status = (int)diagnosis.ConditionStatus,
                entryBy = (int)diagnosis.EntryBy,
                comment = diagnosis.Note ?? string.Empty
            };

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                using var response = await httpClient.PostAsJsonAsync(_explanationEndpoint, payload);
                var responseBody = await response.Content.ReadAsStringAsync();

                var aiResponse = JsonSerializer.Deserialize<AiExplainResponse>(responseBody,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (aiResponse == null)
                {
                    return ServiceResult<AiExplainResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
                }

                return ServiceResult<AiExplainResponse>.Success(aiResponse);
            }
            catch (Exception)
            {
                return ServiceResult<AiExplainResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
            }
        }

        public async Task<ServiceResult<InterpretMedicalLetterResponse>> InterpretMedicalLetter(int? patientId, string? userId, string letterText)
        {
            if (string.IsNullOrWhiteSpace(_interpretEndpoint))
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Interpret-Endpunkt nicht konfiguriert");
            }

            var payload = new
            {
                letterText,
                patientId = (int?)null
            };

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                using var response = await httpClient.PostAsJsonAsync(_interpretEndpoint, payload);

                if (!response.IsSuccessStatusCode)
                {
                    return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service antwortete mit Fehler");
                }

                var responseBody = await response.Content.ReadAsStringAsync();

                var aiResponse = JsonSerializer.Deserialize<NodeResponseWrapper>(responseBody,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (aiResponse?.Extracted == null)
                {
                    return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
                }

                object? savedDiagnosis = null;
                var createReq = aiResponse.Extracted;

                if (patientId.HasValue)
                {
                    try
                    {
                        createReq.PatientId = patientId.Value;
                        createReq.Title = string.IsNullOrWhiteSpace(createReq.Title) ? "Unbekannte Diagnose" : createReq.Title;
                        createReq.Description ??= string.Empty;
                        createReq.IcdCode ??= string.Empty;
                        createReq.Severity ??= string.Empty;
                        createReq.SideLocalization ??= string.Empty;
                        createReq.Status ??= string.Empty;
                        createReq.MedicationText ??= string.Empty;
                        createReq.Symptoms ??= string.Empty;
                        createReq.Findings ??= string.Empty;
                        createReq.TherapeuticMeasures ??= string.Empty;

                        if (createReq.DiagnosisDate == default)
                        {
                            createReq.DiagnosisDate = DateTime.UtcNow;
                        }

                        var createdResult = await _diagnosisService.CreateAsync(patientId.Value, createReq, userId);
                        if (createdResult.IsSuccess)
                        {
                            savedDiagnosis = createdResult.Data;
                        }
                    }
                    catch
                    {
                    }
                }

                var result = new InterpretMedicalLetterResponse
                {
                    Extracted = createReq,
                    Saved = savedDiagnosis
                };

                return ServiceResult<InterpretMedicalLetterResponse>.Success(result);
            }
            catch (Exception)
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
            }
        }

        public async Task<ServiceResult<MedicationScanResponse>> InterpretMedicationImage(string base64, string mimeType)
        {
            if (string.IsNullOrWhiteSpace(_medicationScanEndpoint))
                return ServiceResult<MedicationScanResponse>.InternalServerError("KI-MedicationScan-Endpunkt nicht konfiguriert");

            var payload = new { imageBase64 = base64, mimeType };

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                using var response = await httpClient.PostAsJsonAsync(_medicationScanEndpoint, payload);

                if (!response.IsSuccessStatusCode)
                    return ServiceResult<MedicationScanResponse>.InternalServerError("KI-Service antwortete mit Fehler");

                var responseBody = await response.Content.ReadAsStringAsync();

      
                var wrapper = JsonSerializer.Deserialize<MedicationNodeWrapper>(responseBody,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (wrapper?.Extracted == null)
                    return ServiceResult<MedicationScanResponse>.InternalServerError("KI-Extraktion fehlgeschlagen");

                return ServiceResult<MedicationScanResponse>.Success(wrapper.Extracted);
            }
            catch
            {
                return ServiceResult<MedicationScanResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
            }
        }
    }

    public sealed class AiExplainResponse
    {
        public string? Text { get; set; }
    }

    public sealed class InterpretMedicalLetterResponse
    {
        public object? Extracted { get; set; }
        public object? Saved { get; set; }
    }

    public sealed class NodeResponseWrapper
    {
        public CreateDiagnosisRequest? Extracted { get; set; }
    }

    public sealed class MedicationNodeWrapper
    {
        public MedicationScanResponse? Extracted { get; set; }
    }

    public sealed class MedicationScanResponse
    {
        public string? Name { get; set; }
        public string? Dosage { get; set; }
        public string? Strength { get; set; }
        public string? Form { get; set; }
        public string? Manufacturer { get; set; }
        public string? Notes { get; set; }
    }
}
public sealed class ExplainDiagnosisRequest
{
    public string? LangLevel { get; set; }
}

public sealed class AiExplainResponse
{
    public string? Text { get; set; }
    public string? Disclaimer { get; set; }
}
