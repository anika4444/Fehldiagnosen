using Backend.Application.Common.Results;
using Backend.Application.Services.AIService.Dto;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.DiagnosisService.Dto;
using Backend.Domain.Enums;

namespace Backend.Application.Services.AIService
{
    public class MedicalLetterInterpretationService : IMedicalLetterInterpretationService
    {
        private readonly IAiClient _aiClient;
        private readonly IDiagnosisService _diagnosisService;
        private readonly ILogger<MedicalLetterInterpretationService> _logger;
        private readonly string _interpretEndpoint;

        public MedicalLetterInterpretationService(
            IAiClient aiClient,
            IDiagnosisService diagnosisService,
            IConfiguration configuration,
            ILogger<MedicalLetterInterpretationService> logger)
        {
            _aiClient = aiClient;
            _diagnosisService = diagnosisService;
            _logger = logger;
            _interpretEndpoint = configuration["AiServiceOptions:InterpretEndpoint"] ?? string.Empty;
        }

        public async Task<ServiceResult<InterpretMedicalLetterResponse>> InterpretMedicalLetter(int patientId, string? userId, EntryBy entryBy, string letterText)
        {
            if (string.IsNullOrWhiteSpace(_interpretEndpoint))
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Interpret-Endpunkt nicht konfiguriert");
            }

            var aiResult = await _aiClient.PostAsync<ExtractedDiagnosisWrapper>(_interpretEndpoint, new { letterText });

            if (aiResult.Outcome is AiClientOutcome.ErrorResponse or AiClientOutcome.UnprocessableEntity)
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service antwortete mit Fehler");
            }

            var createRequest = aiResult.Data?.Extracted;

            if (aiResult.Outcome != AiClientOutcome.Success || createRequest == null)
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
            }

            ApplyDefaults(createRequest, patientId);

            try
            {
                var createdResult = await _diagnosisService.CreateAsync(patientId, createRequest, entryBy, userId);

                if (!createdResult.IsSuccess)
                {
                    return new ServiceResult<InterpretMedicalLetterResponse>
                    {
                        ErrorType = createdResult.ErrorType,
                        ErrorMessage = createdResult.ErrorMessage
                    };
                }

                return ServiceResult<InterpretMedicalLetterResponse>.Success(new InterpretMedicalLetterResponse
                {
                    Extracted = createRequest,
                    Saved = createdResult.Data
                });
            }
            catch (Exception ex)
            {
                _logger.LogError("Diagnose aus Arztbrief konnte nicht gespeichert werden: {ExceptionType}", ex.GetType().Name);
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("Diagnose konnte nicht gespeichert werden");
            }
        }

        private static void ApplyDefaults(CreateDiagnosisRequest request, int patientId)
        {
            request.PatientId = patientId;
            request.Title = string.IsNullOrWhiteSpace(request.Title) ? "Unbekannte Diagnose" : request.Title;
            request.Description ??= string.Empty;
            request.IcdCode ??= string.Empty;
            request.Severity ??= string.Empty;
            request.SideLocalization ??= string.Empty;
            request.MedicationText ??= string.Empty;
            request.Symptoms ??= string.Empty;
            request.Findings ??= string.Empty;
            request.TherapeuticMeasures ??= string.Empty;

            if (request.DiagnosisDate == default)
            {
                request.DiagnosisDate = DateTime.UtcNow;
            }

            request.ConditionStatus ??= ConditionStatus.Unknown;
        }

        private sealed class ExtractedDiagnosisWrapper
        {
            public CreateDiagnosisRequest? Extracted { get; set; }
        }
    }
}
