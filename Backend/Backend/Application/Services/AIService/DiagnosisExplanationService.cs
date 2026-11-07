using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.AIService.Dto;
using Backend.Application.Services.DiagnosisService;
using Backend.Domain.Entities;

namespace Backend.Application.Services.AIService
{
    public class DiagnosisExplanationService : IDiagnosisExplanationService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IDiagnosisRepository _diagnosisRepository;
        private readonly ICommunicationLevelRepository _communicationLevelRepository;
        private readonly IDiagnosisService _diagnosisService;
        private readonly IAiClient _aiClient;
        private readonly ILogger<DiagnosisExplanationService> _logger;
        private readonly string _explanationEndpoint;

        public DiagnosisExplanationService(
            IPatientRepository patientRepository,
            IDiagnosisRepository diagnosisRepository,
            ICommunicationLevelRepository communicationLevelRepository,
            IDiagnosisService diagnosisService,
            IAiClient aiClient,
            IConfiguration configuration,
            ILogger<DiagnosisExplanationService> logger)
        {
            _patientRepository = patientRepository;
            _diagnosisRepository = diagnosisRepository;
            _communicationLevelRepository = communicationLevelRepository;
            _diagnosisService = diagnosisService;
            _aiClient = aiClient;
            _logger = logger;
            _explanationEndpoint = configuration["AiServiceOptions:ExplanationEndpoint"] ?? string.Empty;
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

            var payload = new
            {
                langLevel = communicationLevel?.Name ?? "L1",
                kiPrompt = communicationLevel?.KiPrompt ?? "",
                diagnosis = diagnosis.Title,
                icd10Code = diagnosis.IcdCode ?? string.Empty,
                year = diagnosis.DiagnosisDate.Year,
                status = (int)diagnosis.ConditionStatus,
                entryBy = (int)diagnosis.EntryBy,
                comment = diagnosis.Note ?? string.Empty
            };

            var aiResult = await _aiClient.PostAsync<AiExplainResponse>(_explanationEndpoint, payload);

            if (aiResult.Outcome == AiClientOutcome.UnprocessableEntity)
            {
                return ServiceResult<AiExplainResponse>.UnprocessableEntity("KI-Erklärung konnte nicht validiert werden");
            }

            var aiResponse = aiResult.Data;

            if (aiResult.Outcome != AiClientOutcome.Success || aiResponse == null || string.IsNullOrWhiteSpace(aiResponse.Text))
            {
                return ServiceResult<AiExplainResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
            }

            try
            {
                var updateResult = await _diagnosisService.UpdateAiExplanation(diagnosis.Id, aiResponse.Text);

                if (!updateResult.IsSuccess)
                {
                    return ServiceResult<AiExplainResponse>.InternalServerError("KI-Erklärung konnte nicht gespeichert werden");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("KI-Erklärung konnte nicht gespeichert werden: {ExceptionType}", ex.GetType().Name);
                return ServiceResult<AiExplainResponse>.InternalServerError("KI-Erklärung konnte nicht gespeichert werden");
            }

            aiResponse.Disclaimer = Diagnosis.AiExplanationDisclaimer;

            return ServiceResult<AiExplainResponse>.Success(aiResponse);
        }
    }
}
