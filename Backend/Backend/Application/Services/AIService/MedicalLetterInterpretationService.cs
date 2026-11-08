using System.Text.Json;
using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.AIService.Dto;
using Backend.Application.Services.AnonymizerService;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.DiagnosisService.Dto;
using Backend.Application.Services.TextExtractionService;
using Backend.Domain.Enums;
using Microsoft.Extensions.Options;

namespace Backend.Application.Services.AIService
{
    public class MedicalLetterInterpretationService : IMedicalLetterInterpretationService
    {
        private readonly IAiClient _aiClient;
        private readonly IDiagnosisService _diagnosisService;
        private readonly IPatientRepository _patientRepository;
        private readonly ITextExtractionService _textExtractionService;
        private readonly IAnonymizerService _anonymizerService;
        private readonly ILogger<MedicalLetterInterpretationService> _logger;
        private readonly string _interpretEndpoint;

        public MedicalLetterInterpretationService(
            IAiClient aiClient,
            IDiagnosisService diagnosisService,
            IPatientRepository patientRepository,
            ITextExtractionService textExtractionService,
            IAnonymizerService anonymizerService,
            IOptions<AiServiceOptions> options,
            ILogger<MedicalLetterInterpretationService> logger)
        {
            _aiClient = aiClient;
            _diagnosisService = diagnosisService;
            _patientRepository = patientRepository;
            _textExtractionService = textExtractionService;
            _anonymizerService = anonymizerService;
            _logger = logger;
            _interpretEndpoint = options.Value.InterpretEndpoint;
        }

        public async Task<ServiceResult<InterpretMedicalLetterResponse>> ScanMedicalLetter(int patientId, string? userId, EntryBy entryBy, byte[] content, DocumentFormat format)
        {
            // 1. Zugriff zuerst: OCR und KI laufen nur für erlaubte Patienten
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
            {
                return ServiceResult<InterpretMedicalLetterResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }

            if (userId != null && patient.UserId != userId)
            {
                return ServiceResult<InterpretMedicalLetterResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");
            }

            // 2. Text erkennen
            var extraction = await _textExtractionService.ExtractTextAsync(content, format);

            if (!extraction.IsSuccess)
            {
                return Fail(extraction);
            }

            // 3. Anonymisieren; ohne anonymisierten Text geht nichts an die KI
            var anonymizedText = await AnonymizeAsync(extraction.Data!);

            if (string.IsNullOrWhiteSpace(anonymizedText))
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("Arztbrief konnte nicht anonymisiert werden.");
            }

            // 4. KI-Auswertung und 5. Speichern
            return await InterpretMedicalLetter(patientId, userId, entryBy, anonymizedText);
        }

        private async Task<string?> AnonymizeAsync(string text)
        {
            try
            {
                var json = await _anonymizerService.AnonymizeTextAsync(text);
                using var document = JsonDocument.Parse(json);

                return document.RootElement.TryGetProperty("anonymized_text", out var anonymized)
                    ? anonymized.GetString()
                    : null;
            }
            catch (Exception ex)
            {
                // Nur der Typ: Die Python-Fehlerausgabe kann Teile des Briefs enthalten
                _logger.LogError("Anonymisierung fehlgeschlagen: {ExceptionType}", ex.GetType().Name);
                return null;
            }
        }

        private static ServiceResult<InterpretMedicalLetterResponse> Fail(ServiceResult result) =>
            new() { ErrorType = result.ErrorType, ErrorMessage = result.ErrorMessage };

        private async Task<ServiceResult<InterpretMedicalLetterResponse>> InterpretMedicalLetter(int patientId, string? userId, EntryBy entryBy, string letterText)
        {
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
                    return Fail(createdResult);
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
