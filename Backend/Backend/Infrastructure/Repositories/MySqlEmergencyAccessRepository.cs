using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Backend.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlEmergencyAccessRepository : IEmergencyAccessRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlEmergencyAccessRepository(MySqlDbContext context)
        {
            _context = context;
        }

        // Entities loaded here are tracked by EF, so SaveChanges writes only the columns that changed.
        // Calling Update() instead would write the whole row and could overwrite a parallel change,
        // for example bring back a code the patient deactivated a moment ago.
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        #region Codes

        public async Task<List<EmergencyAccessCode>> FindActiveCodesByPatientIdAsync(int patientId)
        {
            return await _context.EmergencyAccessCodes
                .Where(c => c.PatientId == patientId && c.IsActive)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }

        public async Task<EmergencyAccessCode?> FindCodeByTokenHashAsync(string tokenHash)
        {
            return await _context.EmergencyAccessCodes.FirstOrDefaultAsync(c => c.TokenHash == tokenHash);
        }

        public async Task<EmergencyAccessCode?> FindCodeByPublicIdAsync(string publicId)
        {
            return await _context.EmergencyAccessCodes.FirstOrDefaultAsync(c => c.PublicId == publicId);
        }

        public async Task<bool> ReloadCodeAsync(EmergencyAccessCode code)
        {
            var entry = _context.Entry(code);
            await entry.ReloadAsync();
            return entry.State != EntityState.Detached;
        }

        public async Task<bool> PublicIdExistsAsync(string publicId)
        {
            return await _context.EmergencyAccessCodes.AnyAsync(c => c.PublicId == publicId);
        }

        public async Task<EmergencyAccessCode> AddCodeAsync(EmergencyAccessCode code)
        {
            await _context.EmergencyAccessCodes.AddAsync(code);
            await _context.SaveChangesAsync();
            return code;
        }

        #endregion

        #region Sessions

        public async Task<EmergencyAccessSession?> FindSessionByTokenHashAsync(string sessionTokenHash)
        {
            return await _context.EmergencyAccessSessions
                .Include(s => s.Code)
                .FirstOrDefaultAsync(s => s.SessionTokenHash == sessionTokenHash);
        }

        public async Task<EmergencyAccessSession?> FindSessionByIdAsync(int sessionId)
        {
            return await _context.EmergencyAccessSessions
                .Include(s => s.AccessLog)
                .FirstOrDefaultAsync(s => s.Id == sessionId);
        }

        public async Task<List<EmergencyAccessSession>> FindOpenSessionsByPatientIdAsync(int patientId, DateTime now)
        {
            return await _context.EmergencyAccessSessions
                .Include(s => s.AccessLog)
                .Where(s => s.PatientId == patientId
                    && s.RevokedAt == null
                    && s.ExpiresAt > now
                    && (s.ApprovalState == EmergencyApprovalState.NotRequired || s.ApprovalState == EmergencyApprovalState.Approved))
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<EmergencyAccessSession>> FindPendingApprovalsAsync(int patientId, DateTime now)
        {
            return await _context.EmergencyAccessSessions
                .Include(s => s.AccessLog)
                .Where(s => s.PatientId == patientId
                    && s.RevokedAt == null
                    && s.ApprovalState == EmergencyApprovalState.Pending
                    && s.ApprovalExpiresAt > now)
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        public async Task<EmergencyAccessSession> AddSessionAsync(EmergencyAccessSession session)
        {
            await _context.EmergencyAccessSessions.AddAsync(session);
            await _context.SaveChangesAsync();
            return session;
        }

        // Ends every running or pending session of the patient, optionally only of one code
        public async Task<int> RevokeSessionsAsync(int patientId, DateTime now, int? codeId = null)
        {
            var query = _context.EmergencyAccessSessions
                .Where(s => s.PatientId == patientId && s.RevokedAt == null && s.ExpiresAt > now);

            if (codeId != null)
                query = query.Where(s => s.CodeId == codeId);

            var sessions = await query.ToListAsync();
            foreach (var session in sessions)
            {
                session.RevokedAt = now;
            }

            await _context.SaveChangesAsync();
            return sessions.Count;
        }

        #endregion

        #region Access log

        public async Task<EmergencyAccessLog> AddLogAsync(EmergencyAccessLog log)
        {
            await _context.EmergencyAccessLogs.AddAsync(log);
            await _context.SaveChangesAsync();
            return log;
        }

        public async Task<List<EmergencyAccessLog>> FindLogsByPatientIdAsync(int patientId, List<EmergencyAccessOutcome> outcomes, int take)
        {
            return await _context.EmergencyAccessLogs
                .Where(l => l.PatientId == patientId && outcomes.Contains(l.Outcome))
                .OrderByDescending(l => l.AccessedAt)
                .Take(take)
                .ToListAsync();
        }

        #endregion

        #region Settings

        public async Task<EmergencyProfile?> FindProfileAsync(int patientId)
        {
            return await _context.EmergencyProfiles.FirstOrDefaultAsync(p => p.PatientId == patientId);
        }

        public async Task<EmergencyProfile> SaveProfileAsync(EmergencyProfile profile)
        {
            if (profile.Id == 0)
                await _context.EmergencyProfiles.AddAsync(profile);

            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<List<EmergencyShareSetting>> FindShareSettingsAsync(int patientId)
        {
            return await _context.EmergencyShareSettings
                .Where(s => s.PatientId == patientId)
                .ToListAsync();
        }

        // Updates existing rows in place and adds missing ones in one save,
        // so a failed request can never leave the patient without settings
        public async Task SaveShareSettingsAsync(int patientId, List<EmergencyShareSetting> settings)
        {
            var existing = await _context.EmergencyShareSettings
                .Where(s => s.PatientId == patientId)
                .ToListAsync();

            foreach (var setting in settings)
            {
                var row = existing.FirstOrDefault(s => s.CodeType == setting.CodeType && s.Category == setting.Category);

                if (row != null)
                    row.IsEnabled = setting.IsEnabled;
                else
                    await _context.EmergencyShareSettings.AddAsync(setting);
            }

            await _context.SaveChangesAsync();
        }

        #endregion
    }
}
