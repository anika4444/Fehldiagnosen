using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService;
using System.Text.Json;

namespace Backend.Application.Services.AIService
{
    public class AIService : IAIService
    {
        private readonly IPatientRepository _patientRepository;

        private readonly IMedicalHistoryEntryService _medicalHistoryEntryService;

        public AIService(IPatientRepository patientRepository, IMedicalHistoryEntryService medicalHistoryEntryService)
        {
            _patientRepository = patientRepository;
            _medicalHistoryEntryService = medicalHistoryEntryService;
        }

        public async Task<ServiceResult<AiExplainResponse>> ExplainMedicalHistory(int id, string? userId, int medicalHistoryId)
        {
            var explainEndpoint = "http://localhost:3000/ai/explain";
            var langLevel = "basic";

            var entryResult = await _medicalHistoryEntryService.GetByIdAsync(medicalHistoryId, userId);

            if (entryResult == null)
            {
                return ServiceResult<AiExplainResponse>.NotFound($"Vorerkrankung mit ID {medicalHistoryId} nicht gefunden");
            }

            var entry = entryResult.Data;

            var patient = await _patientRepository.FindByIdAsync(entry.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
            {
                return ServiceResult<AiExplainResponse>.Forbidden("Kein Zugriff auf diesen Eintrag.");
            }

            try
            {
                using var httpClient = new HttpClient();
                using var response = await httpClient.PostAsJsonAsync(explainEndpoint, new
                {
                    langLevel,
                    diagnosis = entry.Diagnosis,
                    icd10Code = entry.ICD10Code ?? string.Empty,
                    year = entry.Year.ToString(),
                    status = entry.Status.ToString(),
                    entryBy = entry.EntryBy.ToString(),
                    comment = entry.Comment ?? string.Empty
                });
                var responseBody = await response.Content.ReadAsStringAsync();

                /*if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("AI explain call failed with status {StatusCode}: {Body}", (int)response.StatusCode, responseBody);
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new { error = "KI-Service aktuell nicht erreichbar" });
                }*/

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
                //_logger.LogError(ex, "Fehler bei der Weiterleitung an den KI-Service");
                return ServiceResult<AiExplainResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
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
