using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using System.Linq;
using Backend.Domain.Entities;

namespace Backend.Application.Services.AIService
{
    public class AIService : IAIService
    {
        private readonly IPatientRepository _patientRepository;

        private readonly IMedicalHistoryEntryService _medicalHistoryEntryService;

        private readonly ICommunicationLevelRepository _communicationLevelRepository;

        private readonly IHttpClientFactory _httpClientFactory;

        private readonly string _explanationEndpoint;

        public AIService(IPatientRepository patientRepository, IMedicalHistoryEntryService medicalHistoryEntryService, ICommunicationLevelRepository communicationLevelRepository, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _patientRepository = patientRepository;
            _medicalHistoryEntryService = medicalHistoryEntryService;
            _communicationLevelRepository = communicationLevelRepository;
            _httpClientFactory = httpClientFactory;
            _explanationEndpoint = configuration["AiServiceOptions:ExplanationEndpoint"];
        }

        public async Task<ServiceResult<AiExplainResponse>> ExplainMedicalHistory(int id, string? userId, int medicalHistoryEntryId)
        {
            //var langLevel = "basic";

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

            var payload = new {
                langLevel = communicationLevel?.Name ?? "L1",
                kiPrompt = communicationLevel?.KiPrompt ?? "",
                diagnosis = entry.Diagnosis,
                icd10Code = entry.ICD10Code ?? string.Empty,
                year = entry.Year,
                status = (int)entry.Status,
                entryBy = (int)entry.EntryBy,
                comment = entry.Comment ?? string.Empty
            };

            var json = JsonSerializer.Serialize(payload);

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                using var response = await httpClient.PostAsJsonAsync(_explanationEndpoint, payload);
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
