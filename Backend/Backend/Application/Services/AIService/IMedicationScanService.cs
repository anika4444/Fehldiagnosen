using Backend.Application.Common.Results;
using Backend.Application.Services.AIService.Dto;

namespace Backend.Application.Services.AIService
{
    public interface IMedicationScanService
    {
        Task<ServiceResult<MedicationScanResponse>> InterpretMedicationImage(string base64, string mimeType);
    }
}
