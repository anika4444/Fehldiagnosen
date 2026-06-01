using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.DiagnosisService.Dto;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Net.Http.Json;
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
        private readonly IDiagnosisService _diagnosisService;
        private readonly IHttpClientFactory _httpClientFactory;

        private readonly string _explanationEndpoint;
        private readonly string _interpretEndpoint;

        public AIService(
            IPatientRepository patientRepository,
            IMedicalHistoryEntryService medicalHistoryEntryService,
            ICommunicationLevelRepository communicationLevelRepository,
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration,
            IDiagnosisService diagnosisService)
        {
            _patientRepository = patientRepository;
            _medicalHistoryEntryService = medicalHistoryEntryService;
            _communicationLevelRepository = communicationLevelRepository;
            _httpClientFactory = httpClientFactory;
            _diagnosisService = diagnosisService;
            _explanationEndpoint = configuration["AiServiceOptions:ExplanationEndpoint"] ?? string.Empty;
            _interpretEndpoint = configuration["AiServiceOptions:InterpretEndpoint"] ?? string.Empty;
        }

        public async Task<ServiceResult<AiExplainResponse>> ExplainMedicalHistory(int id, string? userId, int medicalHistoryEntryId)
        {
            var entryResult = await _medicalHistoryEntryService.GetByIdAsync(medicalHistoryEntryId, userId);
            var entry = entryResult?.Data;

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

        public async Task<ServiceResult<InterpretMedicalLetterResponse>> InterpretMedicalLetter(int? patientId, string? userId, string letterText)
        {
            if (string.IsNullOrWhiteSpace(_interpretEndpoint))
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Interpret-Endpunkt nicht konfiguriert");
            }

            var payload = new
            {
                letterText,
                patientId = (int?)null
            };

            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                using var response = await httpClient.PostAsJsonAsync(_interpretEndpoint, payload);

                if (!response.IsSuccessStatusCode)
                {
                    return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service antwortete mit Fehler");
                }

                var responseBody = await response.Content.ReadAsStringAsync();

                var aiResponse = JsonSerializer.Deserialize<NodeResponseWrapper>(responseBody,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (aiResponse?.Extracted == null)
                {
                    return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
                }

                object? savedDiagnosis = null;
                var createReq = aiResponse.Extracted;

                if (patientId.HasValue)
                {
                    try
                    {
                        createReq.PatientId = patientId.Value;
                        createReq.Title = string.IsNullOrWhiteSpace(createReq.Title) ? "Unbekannte Diagnose" : createReq.Title;
                        createReq.Description ??= string.Empty;
                        createReq.IcdCode ??= string.Empty;
                        createReq.Severity ??= string.Empty;
                        createReq.SideLocalization ??= string.Empty;
                        createReq.Status ??= string.Empty;
                        createReq.MedicationText ??= string.Empty;
                        createReq.Symptoms ??= string.Empty;
                        createReq.Findings ??= string.Empty;
                        createReq.TherapeuticMeasures ??= string.Empty;

                        if (createReq.DiagnosisDate == default)
                        {
                            createReq.DiagnosisDate = DateTime.UtcNow;
                        }

                        var createdResult = await _diagnosisService.CreateAsync(patientId.Value, createReq, userId);
                        if (createdResult.IsSuccess)
                        {
                            savedDiagnosis = createdResult.Data;
                        }
                    }
                    catch
                    {
                    }
                }

                var result = new InterpretMedicalLetterResponse
                {
                    Extracted = createReq,
                    Saved = savedDiagnosis
                };

                return ServiceResult<InterpretMedicalLetterResponse>.Success(result);
            }
            catch (Exception)
            {
                return ServiceResult<InterpretMedicalLetterResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
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

    public sealed class InterpretMedicalLetterResponse
    {
        public object? Extracted { get; set; }
        public object? Saved { get; set; }
    }

    public sealed class NodeResponseWrapper
    {
        public CreateDiagnosisRequest? Extracted { get; set; }
    }
}