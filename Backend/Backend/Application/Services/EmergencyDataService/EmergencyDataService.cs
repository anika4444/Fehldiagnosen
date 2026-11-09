using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.DrugInteractionService;
using Backend.Application.Services.DrugInteractionService.Dto;
using Backend.Application.Services.EmergencyAccessService;
using Backend.Application.Services.EmergencyDataService.Dto;
using Backend.Domain.Entities;
using Backend.Domain.Enums;
using Microsoft.Extensions.Caching.Memory;
using System.Text.Json;

namespace Backend.Application.Services.EmergencyDataService
{
    public class EmergencyDataService : IEmergencyDataService
    {
        private const int RecentSymptomDays = 14;
        private const int HistoryLimit = 100;
        private static readonly TimeSpan InsightsCacheDuration = TimeSpan.FromMinutes(10);
        private static readonly TimeSpan AiTimeout = TimeSpan.FromSeconds(20);

        // Rows that existed before the UpdatedAt column get 0001-01-01 and must not count as "updated"
        private static readonly DateTime NoDate = new(2000, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        private readonly IEmergencyAccessRepository _emergencyRepository;
        private readonly IMedicationRepository _medicationRepository;
        private readonly IPatientSymptomRepository _symptomRepository;
        private readonly IDiagnosisRepository _diagnosisRepository;
        private readonly IMedicalHistoryEntryRepository _medicalHistoryRepository;
        private readonly IDrugInteractionService _drugInteractionService;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        private readonly ILogger<EmergencyDataService> _logger;
        private readonly string _summaryEndpoint;

        public EmergencyDataService(
            IEmergencyAccessRepository emergencyRepository,
            IMedicationRepository medicationRepository,
            IPatientSymptomRepository symptomRepository,
            IDiagnosisRepository diagnosisRepository,
            IMedicalHistoryEntryRepository medicalHistoryRepository,
            IDrugInteractionService drugInteractionService,
            IHttpClientFactory httpClientFactory,
            IMemoryCache cache,
            IConfiguration configuration,
            ILogger<EmergencyDataService> logger)
        {
            _emergencyRepository = emergencyRepository;
            _medicationRepository = medicationRepository;
            _symptomRepository = symptomRepository;
            _diagnosisRepository = diagnosisRepository;
            _medicalHistoryRepository = medicalHistoryRepository;
            _drugInteractionService = drugInteractionService;
            _httpClientFactory = httpClientFactory;
            _cache = cache;
            _logger = logger;
            _summaryEndpoint = configuration["AiServiceOptions:EmergencySummaryEndpoint"]
                ?? "http://localhost:3000/ai/emergency-summary";
        }

        public async Task<ServiceResult<EmergencyDataResponse>> GetDataAsync(int patientId, EmergencyCodeType codeType, DateTime? sessionExpiresAt)
        {
            var shared = await GetSharedCategoriesAsync(patientId, codeType);
            var data = await BuildDataAsync(patientId, codeType, shared, sessionExpiresAt);
            return ServiceResult<EmergencyDataResponse>.Success(data);
        }

        public async Task<ServiceResult<EmergencyInsightsResponse>> GetInsightsAsync(int patientId, EmergencyCodeType codeType, int sessionId)
        {
            var shared = await GetSharedCategoriesAsync(patientId, codeType);

            // The shared categories are part of the key, so changed settings take effect right away
            var cacheKey = $"emergency-insights:{sessionId}:{string.Join(",", shared.OrderBy(c => c))}";
            if (_cache.TryGetValue(cacheKey, out EmergencyInsightsResponse? cached) && cached != null)
                return ServiceResult<EmergencyInsightsResponse>.Success(cached);

            var data = await BuildDataAsync(patientId, codeType, shared, null);
            var response = new EmergencyInsightsResponse();

            if (shared.Contains(EmergencyDataCategory.Interactions) && data.Medications != null)
                await AddInteractionsAsync(response, data.Medications);

            if (shared.Contains(EmergencyDataCategory.AiSummary))
            {
                var summary = await RequestSummaryAsync(data, response);
                response.AiSummary = string.IsNullOrWhiteSpace(summary?.Summary) ? null : summary.Summary.Trim();
                response.AiDisclaimer = summary?.Disclaimer;
                response.AiUnavailable = response.AiSummary == null;
            }

            // A failed check is not cached, the next reload should try again
            if (!response.AiUnavailable && !response.InteractionsUnavailable)
                _cache.Set(cacheKey, response, InsightsCacheDuration);

            return ServiceResult<EmergencyInsightsResponse>.Success(response);
        }

        // Builds the response from shared categories only. Unshared data is not even used for
        // warnings or the "last updated" date, so nothing about it can leak.
        private async Task<EmergencyDataResponse> BuildDataAsync(
            int patientId,
            EmergencyCodeType codeType,
            HashSet<EmergencyDataCategory> shared,
            DateTime? sessionExpiresAt)
        {
            var now = DateTime.UtcNow;

            var medications = (await _medicationRepository.FindAllByPatientIdAsync(patientId)).ToList();
            var symptoms = (await _symptomRepository.FindAllByPatientIdAsync(patientId)).ToList();
            var diagnoses = (await _diagnosisRepository.FindAllByPatientIdAsync(patientId)).ToList();
            var history = (await _medicalHistoryRepository.FindAllByPatientIdAsync(patientId)).ToList();

            var response = new EmergencyDataResponse
            {
                CodeType = codeType.ToString(),
                SessionExpiresAt = sessionExpiresAt,
                SessionSecondsRemaining = sessionExpiresAt == null
                    ? null
                    : Math.Max(0, (int)Math.Ceiling((sessionExpiresAt.Value - now).TotalSeconds)),
                SharedCategories = shared.Select(c => c.ToString()).ToList()
            };

            if (shared.Contains(EmergencyDataCategory.Medications))
            {
                response.Medications = medications
                    .Where(m => IsCurrent(m, now))
                    .OrderBy(m => m.Name)
                    .Select(m => ToMedicationDto(m, now))
                    .ToList();
            }

            if (shared.Contains(EmergencyDataCategory.ChronicConditions))
                response.ChronicConditions = BuildConditions(diagnoses, history);

            if (shared.Contains(EmergencyDataCategory.Symptoms))
            {
                response.Symptoms = symptoms
                    .Where(s => s.OccurrenceTime >= now.AddDays(-RecentSymptomDays))
                    .OrderByDescending(s => s.OccurrenceTime)
                    .Select(ToSymptomDto)
                    .ToList();
            }

            // Warnings only use data the code is allowed to show
            if (shared.Contains(EmergencyDataCategory.RedFlags))
            {
                response.RedFlags = EmergencyRedFlagRules.Evaluate(
                    response.Medications ?? new List<EmergencyMedicationDto>(),
                    response.ChronicConditions ?? new List<EmergencyConditionDto>(),
                    response.Symptoms ?? new List<EmergencySymptomDto>(),
                    now);
            }

            if (shared.Contains(EmergencyDataCategory.SymptomHistory))
            {
                response.SymptomHistory = symptoms
                    .OrderByDescending(s => s.OccurrenceTime)
                    .Take(HistoryLimit)
                    .Select(ToSymptomDto)
                    .ToList();
            }

            if (shared.Contains(EmergencyDataCategory.MedicalLetters))
            {
                response.MedicalLetters = diagnoses
                    .Where(HasLetterContent)
                    .OrderByDescending(d => d.DiagnosisDate)
                    .Take(HistoryLimit)
                    .Select(ToLetterDto)
                    .ToList();
            }

            if (shared.Contains(EmergencyDataCategory.MedicationHistory))
            {
                response.MedicationHistory = medications
                    .OrderByDescending(m => m.IntakeStartDate ?? DateTime.MinValue)
                    .Take(HistoryLimit)
                    .Select(m => ToMedicationDto(m, now))
                    .ToList();
            }

            response.LastUpdatedAt = LastUpdated(response, medications, symptoms, diagnoses);
            return response;
        }

        private async Task<HashSet<EmergencyDataCategory>> GetSharedCategoriesAsync(int patientId, EmergencyCodeType codeType)
        {
            var stored = await _emergencyRepository.FindShareSettingsAsync(patientId);
            var shared = EmergencySharePolicy.Resolve(stored, codeType);

            // Interactions name the medications, so they are only shown together with them
            if (!shared.Contains(EmergencyDataCategory.Medications))
                shared.Remove(EmergencyDataCategory.Interactions);

            // Without any shared source data an AI summary could only say "nothing known", which would be misleading
            var hasSummarySource = shared.Contains(EmergencyDataCategory.Medications)
                || shared.Contains(EmergencyDataCategory.ChronicConditions)
                || shared.Contains(EmergencyDataCategory.Symptoms);

            if (!hasSummarySource)
                shared.Remove(EmergencyDataCategory.AiSummary);

            return shared;
        }

        private async Task AddInteractionsAsync(EmergencyInsightsResponse response, List<EmergencyMedicationDto> currentMedications)
        {
            // Medications without ATC code or DrugBank match come back as unchecked
            var medications = currentMedications
                .Select(m => new MedicationAtcDto { Name = m.Name, AtcCode = m.AtcCode ?? string.Empty })
                .ToList();

            var result = await _drugInteractionService.GetInteractionPairsAsync(medications);

            if (result.IsSuccess && result.Data != null)
            {
                response.Interactions = result.Data.Pairs;
                response.UncheckedMedications = result.Data.UncheckedMedications;
            }
            else
            {
                // Never report "no interactions" when the check itself failed
                response.InteractionsUnavailable = true;
                _logger.LogWarning("Emergency interaction check failed");
            }
        }

        private async Task<AiSummaryResult?> RequestSummaryAsync(EmergencyDataResponse data, EmergencyInsightsResponse insights)
        {
            // Only data that is visible on the page goes into the prompt. A list is null when its
            // category is not shared, so the AI can tell "not shared" apart from "nothing recorded".
            var payload = new
            {
                medications = data.Medications?.Select(m => new { name = m.Name, dosage = m.Dosage, intakeFrequency = m.IntakeFrequency, indication = m.Indication }),
                conditions = data.ChronicConditions?.Select(c => new { title = c.Title, icdCode = c.IcdCode, status = c.Status }),
                symptoms = data.Symptoms?.Select(s => new { name = s.Name, intensity = s.Intensity, occurredAt = s.OccurredAt, duration = s.Duration }),
                interactions = insights.Interactions?.Select(i => new { medicationA = i.MedicationA, medicationB = i.MedicationB, description = i.Description }),
                interactionsUnavailable = insights.InteractionsUnavailable,
                uncheckedMedications = insights.UncheckedMedications,
                redFlags = data.RedFlags?.Select(f => f.Title)
            };

            try
            {
                using var timeout = new CancellationTokenSource(AiTimeout);
                var httpClient = _httpClientFactory.CreateClient();
                using var response = await httpClient.PostAsJsonAsync(_summaryEndpoint, payload, timeout.Token);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("Emergency summary failed with status {Status}", (int)response.StatusCode);
                    return null;
                }

                var body = await response.Content.ReadAsStringAsync(timeout.Token);
                return JsonSerializer.Deserialize<AiSummaryResult>(body, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            }
            catch (Exception ex)
            {
                // Never log the payload, it contains health data
                _logger.LogWarning("Emergency summary not available: {Error}", ex.GetType().Name);
                return null;
            }
        }

        // Diagnoses and medical history entries that are chronic or active. The same condition
        // can be in both lists, so entries with the same ICD code or title are shown once.
        private static List<EmergencyConditionDto> BuildConditions(List<Diagnosis> diagnoses, List<MedicalHistoryEntry> history)
        {
            var fromDiagnoses = diagnoses
                .Where(d => IsRelevant(d.ConditionStatus))
                .OrderByDescending(d => d.DiagnosisDate)
                .Select(d => new EmergencyConditionDto
                {
                    Title = d.Title,
                    IcdCode = string.IsNullOrWhiteSpace(d.IcdCode) ? null : d.IcdCode.Trim(),
                    Status = StatusLabel(d.ConditionStatus),
                    Year = d.DiagnosisDate.Year
                });

            var fromHistory = history
                .Where(h => IsRelevant(h.Status))
                .OrderByDescending(h => h.Year)
                .Select(h => new EmergencyConditionDto
                {
                    Title = h.Diagnosis,
                    IcdCode = string.IsNullOrWhiteSpace(h.ICD10Code) ? null : h.ICD10Code.Trim(),
                    Status = StatusLabel(h.Status),
                    Year = h.Year
                });

            return fromDiagnoses
                .Concat(fromHistory)
                .GroupBy(c => (c.IcdCode ?? c.Title).Trim().ToUpperInvariant())
                .Select(g => g.First())
                .ToList();
        }

        private static bool IsRelevant(ConditionStatus status)
        {
            return status == ConditionStatus.Chronical || status == ConditionStatus.Active;
        }

        private static string StatusLabel(ConditionStatus status)
        {
            return status switch
            {
                ConditionStatus.Chronical => "chronisch",
                ConditionStatus.Active => "aktiv",
                _ => "in Remission"
            };
        }

        // An empty duration means long term medication
        private static bool IsCurrent(Medication medication, DateTime now)
        {
            var started = medication.IntakeStartDate == null || medication.IntakeStartDate <= now;
            var notEnded = medication.DurationInDays <= 0 || medication.EndDate == null || medication.EndDate >= now;
            return started && notEnded;
        }

        private static bool HasLetterContent(Diagnosis d)
        {
            return !string.IsNullOrWhiteSpace(d.Description)
                || !string.IsNullOrWhiteSpace(d.Findings)
                || !string.IsNullOrWhiteSpace(d.TherapeuticMeasures)
                || !string.IsNullOrWhiteSpace(d.MedicationText)
                || !string.IsNullOrWhiteSpace(d.AiExplanation);
        }

        // Only data the response actually contains counts, so the date reveals nothing about unshared data
        private static DateTime? LastUpdated(
            EmergencyDataResponse response,
            List<Medication> medications,
            List<PatientSymptom> symptoms,
            List<Diagnosis> diagnoses)
        {
            var dates = new List<DateTime>();

            if (response.Medications != null || response.MedicationHistory != null)
                dates.AddRange(medications.Select(m => m.UpdatedAt));

            if (response.Symptoms != null || response.SymptomHistory != null)
                dates.AddRange(symptoms.Select(s => s.CreatedAt));

            if (response.ChronicConditions != null || response.MedicalLetters != null)
                dates.AddRange(diagnoses.Select(d => d.UpdatedAt));

            var valid = dates.Where(d => d > NoDate).ToList();
            return valid.Count == 0 ? null : valid.Max();
        }

        private static EmergencyMedicationDto ToMedicationDto(Medication m, DateTime now)
        {
            return new EmergencyMedicationDto
            {
                Name = m.Name,
                Dosage = m.Dosage,
                IntakeFrequency = m.IntakeFrequency,
                Indication = m.Indication,
                AtcCode = m.AtcCode,
                StartDate = m.IntakeStartDate,
                EndDate = m.DurationInDays > 0 ? m.EndDate : null,
                IsCurrent = IsCurrent(m, now)
            };
        }

        private static EmergencyLetterDto ToLetterDto(Diagnosis d)
        {
            return new EmergencyLetterDto
            {
                Subject = d.Title,
                IcdCode = string.IsNullOrWhiteSpace(d.IcdCode) ? null : d.IcdCode.Trim(),
                Date = d.DiagnosisDate,
                Status = StatusLabel(d.ConditionStatus),
                Text = NullIfEmpty(d.Description),
                Findings = NullIfEmpty(d.Findings),
                TherapeuticMeasures = NullIfEmpty(d.TherapeuticMeasures),
                MedicationText = NullIfEmpty(d.MedicationText),
                AiExplanation = NullIfEmpty(d.AiExplanation)
            };
        }

        private static EmergencySymptomDto ToSymptomDto(PatientSymptom s)
        {
            return new EmergencySymptomDto
            {
                Name = s.SymptomDefinition?.Name ?? s.SymptomName ?? "Symptom",
                Intensity = s.Intensity,
                OccurredAt = s.OccurrenceTime,
                Duration = s.Duration,
                PossibleTrigger = s.PossibleTrigger,
                Notes = s.Notes
            };
        }

        private static string? NullIfEmpty(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }

        private sealed class AiSummaryResult
        {
            public string? Summary { get; set; }
            public string? Disclaimer { get; set; }
        }
    }
}
