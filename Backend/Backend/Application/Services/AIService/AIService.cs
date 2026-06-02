using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.AIService.Dto;
using Backend.Application.Services.MedicalHistoryEntryService;
using Backend.Domain.Entities;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;
using System.Text.Json;

namespace Backend.Application.Services.AIService
{
    public class AIService : IAIService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMedicalHistoryEntryService _medicalHistoryEntryService;
        private readonly IMedicalHistoryEntryRepository _medicalHistoryEntryRepository;
        private readonly IMedicationRepository _medicationRepository;
        private readonly IPatientSymptomRepository _patientSymptomRepository;
        private readonly ICommunicationLevelRepository _communicationLevelRepository;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _explanationEndpoint;
        private readonly string _eurouterUrl;
        private readonly string _eurouterModel;
        private readonly string _eurouterApiKey;

        public AIService(
            IPatientRepository patientRepository,
            IMedicalHistoryEntryService medicalHistoryEntryService,
            IMedicalHistoryEntryRepository medicalHistoryEntryRepository,
            IMedicationRepository medicationRepository,
            IPatientSymptomRepository patientSymptomRepository,
            ICommunicationLevelRepository communicationLevelRepository,
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration)
        {
            _patientRepository = patientRepository;
            _medicalHistoryEntryService = medicalHistoryEntryService;
            _medicalHistoryEntryRepository = medicalHistoryEntryRepository;
            _medicationRepository = medicationRepository;
            _patientSymptomRepository = patientSymptomRepository;
            _communicationLevelRepository = communicationLevelRepository;
            _httpClientFactory = httpClientFactory;
            _explanationEndpoint = configuration["AiServiceOptions:ExplanationEndpoint"];
            _eurouterUrl = configuration["AiServiceOptions:EurouterUrl"] ?? "https://api.eurouter.ai/api/v1/chat/completions";
            _eurouterModel = configuration["AiServiceOptions:EurouterModel"] ?? "gpt-oss-20b";
            _eurouterApiKey = configuration["AiServiceOptions:EurouterApiKey"] ?? string.Empty;
        }

        public async Task<ServiceResult<AiExplainResponse>> ExplainMedicalHistory(int id, string? userId, int medicalHistoryEntryId)
        {
            var entryResult = await _medicalHistoryEntryService.GetByIdAsync(medicalHistoryEntryId, userId);
            var entry = entryResult?.Data ?? null;

            if (entry == null)
            {
                return ServiceResult<AiExplainResponse>.NotFound($"Vorerkrankung mit ID {medicalHistoryEntryId} nicht gefunden");
            }

            var patient = await _patientRepository.FindByIdAsync(entry.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
            {
                return ServiceResult<AiExplainResponse>.Forbidden("Kein Zugriff auf diesen Eintrag.");
            }

            var communicationLevels = await _communicationLevelRepository.GetAllAsync();

            var communicationLevel = communicationLevels?.FirstOrDefault(level => level.Id == patient?.CommunicationLevel?.Id)
                         ?? communicationLevels?.FirstOrDefault();

            var payload = new
            {
                langLevel = communicationLevel?.Name ?? "L1",
                kiPrompt = communicationLevel?.KiPrompt ?? "",
                diagnosis = entry.Diagnosis,
                icd10Code = entry.ICD10Code ?? string.Empty,
                year = entry.Year,
                status = (int)entry.Status,
                entryBy = (int)entry.EntryBy,
                comment = entry.Comment ?? string.Empty
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

            var from = request.From;
            var to = request.To;

            var diagnoses = await _medicalHistoryEntryRepository.FindAllByPatientIdAsync(patientId);
            var medications = await _medicationRepository.FindAllByPatientIdAsync(patientId);
            var symptoms = await _patientSymptomRepository.FindAllByPatientIdAsync(patientId);

            var diagnosesInRange = diagnoses.Where(d =>
                d.Year >= from.Year && d.Year <= to.Year
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
                    ICD10Code = d.ICD10Code,
                    Diagnosis = d.Diagnosis,
                    Year = d.Year,
                    Status = d.Status.ToString(),
                    Comment = d.Comment
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

            response.AiSummary = await CallEurouterForCheckupSummary(response);

            return ServiceResult<CheckupSummaryResponse>.Success(response);
        }

        private async Task<string?> CallEurouterForCheckupSummary(CheckupSummaryResponse data)
        {
            if (string.IsNullOrWhiteSpace(_eurouterApiKey))
            {
                return "AI-Summary nicht verfügbar: API-Key nicht konfiguriert.";
            }

            var diagnosesText = data.Diagnoses.Count == 0
                ? "Keine Diagnosen im Zeitraum."
                : string.Join("\n", data.Diagnoses.Select(d =>
                    $"- {d.Diagnosis} (ICD10: {d.ICD10Code}, Jahr: {d.Year}, Status: {d.Status}, Kommentar: {d.Comment})"));

            var medicationsText = data.Medications.Count == 0
                ? "Keine Medikamente im Zeitraum."
                : string.Join("\n", data.Medications.Select(m =>
                    $"- {m.Name} (Dosis: {m.Dosage}, Frequenz: {m.IntakeFrequency}, Start: {m.IntakeStartDate:yyyy-MM-dd}, Ende: {m.EndDate:yyyy-MM-dd}, Indikation: {m.Indication}, ATC: {m.AtcCode})"));

            var symptomsText = data.Symptoms.Count == 0
                ? "Keine Symptome im Zeitraum."
                : string.Join("\n", data.Symptoms.Select(s =>
                    $"- {s.SymptomName} (Zeit: {s.OccurrenceTime:yyyy-MM-dd HH:mm}, Intensität: {s.Intensity}/10, Dauer: {s.Duration}, Auslöser: {s.PossibleTrigger}, Notiz: {s.Notes})"));
            var systemPrompt = @"Du bist ein medizinischer Assistent, der Patienten dabei hilft, ihre Gesundheitsdaten zu verstehen und Gespräche mit dem Arzt vorzubereiten.

Wichtige Regeln:
- Du stellst keine eigenen Diagnosen und gibst keine Therapieempfehlungen.
- Du nennst mögliche Nebenwirkungen von Medikamenten nur als allgemeine Information, basierend auf bekanntem Fachwissen.
- Du verwendest eine freundliche, empathische und klare Sprache, die für medizinische Laien leicht verständlich ist.
- Du formatierst deine Antwort ausschließlich als reinen Fließtext. Verwende absolut keine Markdown-Formatierungen (keine Sternchen **, keine Rauten ## für Überschriften, keine Aufzählungszeichen).
- Du verwendest 'Sie' als höfliche Anrede.";

            var userPrompt = $@"Erstelle eine zusammenfassende Auswertung der folgenden Patientendaten für den Zeitraum {data.From:dd.MM.yyyy} bis {data.To:dd.MM.yyyy}.

DIAGNOSEN:
{diagnosesText}

MEDIKAMENTE:
{medicationsText}

SYMPTOME:
{symptomsText}

Strukturiere deine Antwort zwingend in genau vier Absätzen, die durch Leerzeilen getrennt sind. Verwende KEINE Überschriften (schreibe also nicht 'Absatz 1' o. Ä.) und keine Listen.

Absatz 1 (Gesundheitsstatus): Fasse in eigenen Worten zusammen, welche Diagnosen vorliegen und in welchem Zustand sie sind (chronisch, aktiv, in Remission). Erwähne, ob es sich um langfristige oder akute Erkrankungen handelt.

Absatz 2 (Medikation): Beschreibe im Fließtext, welche Medikamente eingenommen werden und wofür sie typischerweise eingesetzt werden. Erwähne bei jedem Medikament die häufigsten bekannten Nebenwirkungen in einem kurzen Satz.

Absatz 3 (Mögliche Zusammenhänge): Prüfe, ob die aufgetretenen Symptome zu bekannten Nebenwirkungen der Medikamente passen oder ob sie mit einer der Diagnosen zusammenhängen könnten. Formuliere hier sehr zurückhaltend und im Konjunktiv (z. B. 'könnte zusammenhängen mit', 'es wäre möglich, dass').

Absatz 4 (Empfehlung für das Arztgespräch): Nenne drei bis fünf konkrete Aspekte, die der Patient beim nächsten Arzttermin ansprechen sollte (z. B. ungewöhnliche Symptome, Auffälligkeiten in der Medikation). WICHTIG: Formuliere diese Punkte als zusammenhängenden Text und nicht als Aufzählung. Beende diesen Absatz mit einem kurzen Satz, der darauf hinweist, dass diese Auswertung keinen Ersatz für eine ärztliche Beratung darstellt.

Fasse dich präzise und verwende für die gesamte Antwort maximal 350 Wörter.";

            var payload = new
            {
                model = _eurouterModel,
                messages = new[]
                {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = userPrompt }
                }
            };

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                httpClient.Timeout = TimeSpan.FromMinutes(2);
                httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", _eurouterApiKey);

                using var response = await httpClient.PostAsJsonAsync(_eurouterUrl, payload);

                if (!response.IsSuccessStatusCode)
                {
                    return "AI-Summary aktuell nicht verfügbar.";
                }

                var body = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(body);

                if (doc.RootElement.TryGetProperty("choices", out var choices) &&
                    choices.GetArrayLength() > 0 &&
                    choices[0].TryGetProperty("message", out var message) &&
                    message.TryGetProperty("content", out var content))
                {
                    return content.GetString();
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

public sealed class ExplainMedicalHistoryRequest
{
    public string? LangLevel { get; set; }
}

public sealed class AiExplainResponse
{
    public string? Text { get; set; }
}