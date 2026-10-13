using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.CheckupService.Dto;
using Backend.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;
using System.Text.Json;

namespace Backend.Application.Services.CheckupService
{
    public class CheckupService : ICheckupService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IDiagnosisRepository _diagnosisRepository;
        private readonly IMedicationRepository _medicationRepository;
        private readonly IPatientSymptomRepository _patientSymptomRepository;
        private readonly ICommunicationLevelRepository _communicationLevelRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _checkupSummaryEndpoint;

        public CheckupService(
            IPatientRepository patientRepository,
            IDiagnosisRepository diagnosisRepository,
            IMedicationRepository medicationRepository,
            IPatientSymptomRepository patientSymptomRepository,
            ICommunicationLevelRepository communicationLevelRepository,
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration)
        {
            _patientRepository = patientRepository;
            _diagnosisRepository = diagnosisRepository;
            _medicationRepository = medicationRepository;
            _patientSymptomRepository = patientSymptomRepository;
            _communicationLevelRepository = communicationLevelRepository;
            _httpClientFactory = httpClientFactory;
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

            var diagnoses = await _diagnosisRepository.FindAllByPatientIdAsync(patientId);
            var medications = await _medicationRepository.FindAllByPatientIdAsync(patientId);
            var symptoms = await _patientSymptomRepository.FindAllByPatientIdAsync(patientId);

            var diagnosesInRange = diagnoses.Where(d =>
                d.DiagnosisDate >= from && d.DiagnosisDate <= to
            ).ToList();

            var medicationsInRange = medications.Where(m =>
                m.IntakeStartDate.HasValue &&
                m.IntakeStartDate.Value <= to &&
                (m.EndDate == null || m.EndDate >= from)
            ).ToList();

            var symptomsInRange = symptoms.Where(s =>
                s.OccurrenceTime >= from && s.OccurrenceTime <= to
            ).ToList();

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

            response.AiSummary = await CallAiServiceForCheckupSummary(
                response,
                communicationLevel?.Name ?? "L1",
                communicationLevel?.KiPrompt ?? string.Empty);

            return ServiceResult<CheckupSummaryResponse>.Success(response);
        }

        private async Task<string?> CallAiServiceForCheckupSummary(CheckupSummaryResponse data, string langLevel, string kiPrompt)
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

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                httpClient.Timeout = TimeSpan.FromMinutes(2);

                using var response = await httpClient.PostAsJsonAsync(_checkupSummaryEndpoint, payload);

                if (!response.IsSuccessStatusCode)
                {
                    return "AI-Summary aktuell nicht verfügbar.";
                }

                var body = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(body);

                if (doc.RootElement.TryGetProperty("summary", out var summary))
                {
                    return summary.GetString();
                }

                return "AI-Summary konnte nicht erstellt werden.";
            }
            catch (Exception)
            {
                return "AI-Summary aktuell nicht erreichbar.";
            }
        }
    }
}