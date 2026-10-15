using Backend.Application.Common.Results;
using Backend.Application.Services.EmergencyAccessService.Dto;
using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Application.Services.EmergencyAccessService
{
    public interface IEmergencyAccessService
    {
        #region Patient side (app, JWT)

        Task<ServiceResult<EmergencyOverviewResponse>> GetOverviewAsync(int patientId, string userId);

        Task<ServiceResult<EmergencySettingsResponse>> SetConsentAsync(int patientId, string userId, bool given);

        Task<ServiceResult<GeneratedEmergencyCodeResponse>> RegenerateCodeAsync(int patientId, string userId, EmergencyCodeType type);

        Task<ServiceResult> DeactivateCodeAsync(int patientId, string userId, EmergencyCodeType type);

        Task<ServiceResult<GeneratedEmergencyCodeResponse>> CreateOneTimeLinkAsync(int patientId, string userId);

        Task<ServiceResult<EmergencySettingsResponse>> GetSettingsAsync(int patientId, string userId);

        Task<ServiceResult<EmergencySettingsResponse>> UpdateSettingsAsync(int patientId, string userId, UpdateEmergencySettingsRequest request);

        Task<ServiceResult<IEnumerable<EmergencyAccessLogResponse>>> GetLogsAsync(int patientId, string userId);

        Task<ServiceResult<IEnumerable<PendingApprovalResponse>>> GetPendingApprovalsAsync(int patientId, string userId);

        Task<ServiceResult> DecideApprovalAsync(int patientId, string userId, int sessionId, bool approve);

        Task<ServiceResult<int>> RevokeAllSessionsAsync(int patientId, string userId);

        Task<ServiceResult> RevokeSessionAsync(int patientId, string userId, int sessionId);

        // Ownership check for other emergency endpoints, e.g. the data preview
        Task<ServiceResult> EnsureOwnerAsync(int patientId, string userId);

        #endregion

        #region Portal side (anonymous, session token)

        Task<ServiceResult<EmergencySessionResponse>> StartSessionWithTokenAsync(TokenSessionRequest request, EmergencyClientInfo client);

        Task<ServiceResult<EmergencySessionResponse>> StartSessionWithPinAsync(PinSessionRequest request, EmergencyClientInfo client);

        Task<ServiceResult<EmergencySessionResponse>> GetSessionStatusAsync(string? sessionToken);

        // Returns the session only if it may read data right now
        Task<ServiceResult<EmergencyAccessSession>> GetReadableSessionAsync(string? sessionToken);

        Task<ServiceResult> EndSessionAsync(string? sessionToken);

        #endregion
    }
}
