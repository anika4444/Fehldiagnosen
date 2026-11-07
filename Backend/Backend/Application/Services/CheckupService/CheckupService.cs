using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.CheckupService.Dto;
using Backend.Domain.Entities;
using Backend.Application.Services.AIService;
using Microsoft.Extensions.Configuration;

namespace Backend.Application.Services.CheckupService
{
    public class CheckupService : ICheckupService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IDiagnosisRepository _diagnosisRepository;
        private readonly IMedicationRepository _medicationRepository;
        private readonly IPatientSymptomRepository _patientSymptomRepository;
        private readonly ICommunicationLevelRepository _communicationLevelRepository;
        private readonly IAiClient _aiClient;
        private readonly string _checkupSummaryEndpoint;

        private static readonly TimeSpan CheckupSummaryTimeout = TimeSpan.FromMinutes(2);

        public CheckupService(
            IPatientRepository patientRepository,
            IDiagnosisRepository diagnosisRepository,
            IMedicationRepository medicationRepository,
            IPatientSymptomRepository patientSymptomRepository,
            ICommunicationLevelRepository communicationLevelRepository,
            IAiClient aiClient,
            IConfiguration configuration)
        {
            _patientRepository = patientRepository;
            _diagnosisRepository = diagnosisRepository;
            _medicationRepository = medicationRepository;
            _patientSymptomRepository = patientSymptomRepository;
            _communicationLevelRepository = communicationLevelRepository;
            _aiClient = aiClient;
            _checkupSummaryEndpoint = configuration["AiServiceOptions:CheckupSummaryEndpoint"]
                ?? "http://localhost:3000/ai/checkup-summary";
        }

        public async Task<ServiceResult<CheckupSummaryResponse>> GenerateCheckupSummary(int patientId, string? userId, CheckupSummaryRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
            {
                return ServiceResult<CheckupSummaryResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }

            if (userId != null && patient.UserId != userId)
            {
                return ServiceResult<CheckupSummaryResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");
            }

            var communicationLevels = await _communicationLevelRepository.GetAllAsync();
            var communicationLevel = communicationLevels?.FirstOrDefault(level => level.Id == patient.CommunicationLevelId)
                ?? communicationLevels?.FirstOrDefault();

            var from = request.From;
            var to = request.To;

            var diagnosesInRange = await _diagnosisRepository.FindAllByPatientIdAndDateRangeAsync(patientId, from, to);
            var medicationsInRange = await _medicationRepository.FindAllByPatientIdAndDateRangeAsync(patientId, from, to);
            var symptomsInRange = await _patientSymptomRepository.FindAllByPatientIdAndDateRangeAsync(patientId, from, to);

            var response = new CheckupSummaryResponse
            {
                From = from,
                To = to,
                Diagnoses = diagnosesInRange.Select(d => new CheckupDiagnosis
                {
                    Id = d.Id,
                    ICD10Code = d.IcdCode,
                    Diagnosis = d.Title,
                    Year = d.DiagnosisDate.Year,
                    Status = d.ConditionStatus.ToString(),
                    Comment = d.Note
                }).ToList(),
                Medications = medicationsInRange.Select(m => new CheckupMedication
                {
                    Id = m.Id,
                    Name = m.Name,
                    Dosage = m.Dosage,
                    IntakeFrequency = m.IntakeFrequency,
                    IntakeStartDate = m.IntakeStartDate,
                    EndDate = m.EndDate,
                    Indication = m.Indication,
                    AtcCode = m.AtcCode
                }).ToList(),
                Symptoms = symptomsInRange.Select(s => new CheckupSymptom
                {
                    Id = s.Id,
                    SymptomName = s.SymptomName,
                    OccurrenceTime = s.OccurrenceTime,
                    Intensity = s.Intensity,
                    Duration = s.Duration,
                    PossibleTrigger = s.PossibleTrigger,
                    Notes = s.Notes
                }).ToList()
            };

            // Ein KI-Fehler bricht den Checkup nicht ab: Die Daten werden trotzdem geliefert,
            // der Fehler steht in AiSummaryError, damit das Frontend ihn anzeigen kann
            (response.AiSummary, response.AiSummaryError) = await CallAiServiceForCheckupSummary(
                response,
                communicationLevel?.Name ?? "L1",
                communicationLevel?.KiPrompt ?? string.Empty);

            return ServiceResult<CheckupSummaryResponse>.Success(response);
        }

        private async Task<(string? Summary, string? Error)> CallAiServiceForCheckupSummary(CheckupSummaryResponse data, string langLevel, string kiPrompt)
        {
            var payload = new
            {
                langLevel,
                kiPrompt,
                from = data.From,
                to = data.To,
                diagnoses = data.Diagnoses.Select(d => new
                {
                    diagnosis = d.Diagnosis,
                    icd10Code = d.ICD10Code,
                    year = d.Year,
                    status = d.Status,
                    comment = d.Comment
                }),
                medications = data.Medications.Select(m => new
                {
                    name = m.Name,
                    dosage = m.Dosage,
                    intakeFrequency = m.IntakeFrequency,
                    intakeStartDate = m.IntakeStartDate,
                    endDate = m.EndDate,
                    indication = m.Indication,
                    atcCode = m.AtcCode
                }),
                symptoms = data.Symptoms.Select(s => new
                {
                    symptomName = s.SymptomName,
                    occurrenceTime = s.OccurrenceTime,
                    intensity = s.Intensity,
                    duration = s.Duration,
                    possibleTrigger = s.PossibleTrigger,
                    notes = s.Notes
                })
            };

            var aiResult = await _aiClient.PostAsync<CheckupSummaryAiResponse>(_checkupSummaryEndpoint, payload, CheckupSummaryTimeout);

            return aiResult.Outcome switch
            {
                AiClientOutcome.Unavailable => (null, "KI-Service aktuell nicht erreichbar. Bitte später erneut versuchen."),
                AiClientOutcome.Success when !string.IsNullOrWhiteSpace(aiResult.Data?.Summary) => (aiResult.Data!.Summary, null),
                AiClientOutcome.Success => (null, "KI-Zusammenfassung konnte nicht erstellt werden."),
                _ => (null, "KI-Zusammenfassung aktuell nicht verfügbar.")
            };
        }

        private sealed class CheckupSummaryAiResponse
        {
            public string? Summary { get; set; }
        }
    }
}