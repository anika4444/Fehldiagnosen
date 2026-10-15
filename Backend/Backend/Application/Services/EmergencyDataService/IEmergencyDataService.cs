using Backend.Application.Common.Results;
using Backend.Application.Services.EmergencyDataService.Dto;
using Backend.Domain.Enums;

namespace Backend.Application.Services.EmergencyDataService
{
    // Collects the shared health data for the portal. Authorization happens before, in the controller.
    public interface IEmergencyDataService
    {
        Task<ServiceResult<EmergencyDataResponse>> GetDataAsync(int patientId, EmergencyCodeType codeType, DateTime? sessionExpiresAt);

        Task<ServiceResult<EmergencyInsightsResponse>> GetInsightsAsync(int patientId, EmergencyCodeType codeType, int sessionId);
    }
}
