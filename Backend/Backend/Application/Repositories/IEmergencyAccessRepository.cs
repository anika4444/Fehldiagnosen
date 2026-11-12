using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Application.Repositories
{
    // All database access of the emergency feature in one place
    public interface IEmergencyAccessRepository
    {
        // Writes all changes of entities loaded through this repository. Only changed columns are written.
        Task SaveChangesAsync();

        // Codes
        Task<List<EmergencyAccessCode>> FindActiveCodesByPatientIdAsync(int patientId);
        Task<EmergencyAccessCode?> FindCodeByTokenHashAsync(string tokenHash);
        Task<EmergencyAccessCode?> FindCodeByPublicIdAsync(string publicId);
        // Reads the current values from the database again, false when the code no longer exists
        Task<bool> ReloadCodeAsync(EmergencyAccessCode code);
        Task<bool> PublicIdExistsAsync(string publicId);
        Task<EmergencyAccessCode> AddCodeAsync(EmergencyAccessCode code);

        // Sessions
        Task<EmergencyAccessSession?> FindSessionByTokenHashAsync(string sessionTokenHash);
        Task<EmergencyAccessSession?> FindSessionByIdAsync(int sessionId);
        Task<List<EmergencyAccessSession>> FindOpenSessionsByPatientIdAsync(int patientId, DateTime now);
        Task<List<EmergencyAccessSession>> FindPendingApprovalsAsync(int patientId, DateTime now);
        Task<EmergencyAccessSession> AddSessionAsync(EmergencyAccessSession session);
        Task<int> RevokeSessionsAsync(int patientId, DateTime now, int? codeId = null);

        // Access log
        Task<EmergencyAccessLog> AddLogAsync(EmergencyAccessLog log);
        Task<List<EmergencyAccessLog>> FindLogsByPatientIdAsync(int patientId, List<EmergencyAccessOutcome> outcomes, int take);

        // Settings
        Task<EmergencyProfile?> FindProfileAsync(int patientId);
        Task<EmergencyProfile> SaveProfileAsync(EmergencyProfile profile);
        Task<List<EmergencyShareSetting>> FindShareSettingsAsync(int patientId);
        Task SaveShareSettingsAsync(int patientId, List<EmergencyShareSetting> settings);
    }
}
