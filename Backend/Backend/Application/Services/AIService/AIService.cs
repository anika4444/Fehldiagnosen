using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using System.Linq;
using Backend.Domain.Entities;

namespace Backend.Application.Services.AIService
{
    public class AIService : IAIService
    {
        private readonly IPatientRepository _patientRepository;

        private readonly IDiagnosisRepository _diagnosisRepository;

        private readonly ICommunicationLevelRepository _communicationLevelRepository;

        private readonly IHttpClientFactory _httpClientFactory;

        private readonly string _explanationEndpoint;

        public AIService(IPatientRepository patientRepository, IDiagnosisRepository diagnosisRepository, ICommunicationLevelRepository communicationLevelRepository, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _patientRepository = patientRepository;
            _diagnosisRepository = diagnosisRepository;
            _communicationLevelRepository = communicationLevelRepository;
            _httpClientFactory = httpClientFactory;
            _explanationEndpoint = configuration["AiServiceOptions:ExplanationEndpoint"];
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
            catch (Exception ex)
            {
                return ServiceResult<AiExplainResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
            }
        }
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
