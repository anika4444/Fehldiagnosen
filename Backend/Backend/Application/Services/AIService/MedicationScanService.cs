using Backend.Application.Common.Results;
using Backend.Application.Services.AIService.Dto;
using Microsoft.Extensions.Options;

namespace Backend.Application.Services.AIService
{
    public class MedicationScanService : IMedicationScanService
    {
        private readonly IAiClient _aiClient;
        private readonly string _medicationScanEndpoint;

        public MedicationScanService(IAiClient aiClient, IOptions<AiServiceOptions> options)
        {
            _aiClient = aiClient;
            _medicationScanEndpoint = options.Value.MedicationScanEndpoint;
        }

        public async Task<ServiceResult<MedicationScanResponse>> InterpretMedicationImage(string base64, string mimeType)
        {
            var aiResult = await _aiClient.PostAsync<MedicationScanResponse>(_medicationScanEndpoint, new { imageBase64 = base64, mimeType });

            if (aiResult.Outcome is AiClientOutcome.ErrorResponse or AiClientOutcome.UnprocessableEntity)
            {
                return ServiceResult<MedicationScanResponse>.InternalServerError("KI-Service antwortete mit Fehler");
            }

            if (aiResult.Outcome != AiClientOutcome.Success)
            {
                return ServiceResult<MedicationScanResponse>.InternalServerError("KI-Service aktuell nicht erreichbar");
            }

            var result = aiResult.Data;

            // Brand ist jetzt der Pflicht-Anker statt Name
            if (result == null || string.IsNullOrWhiteSpace(result.Brand))
            {
                return ServiceResult<MedicationScanResponse>.InternalServerError("KI-Extraktion fehlgeschlagen");
            }

            return ServiceResult<MedicationScanResponse>.Success(result);
        }
    }
}
