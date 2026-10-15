using Backend.Application.Common.Results;
using Backend.Application.Common.Security;
using Backend.Application.Repositories;
using Backend.Application.Services.EmergencyAccessService.Dto;
using Backend.Domain.Entities;
using Backend.Domain.Enums;
using Microsoft.Extensions.Options;

namespace Backend.Application.Services.EmergencyAccessService
{
    public class EmergencyAccessService : IEmergencyAccessService
    {
        // One message for every rejected QR token and one for every rejected PIN, so nobody can
        // find out which ids exist or which ones are locked right now
        private const string InvalidCodeMessage = "Code ungültig oder abgelaufen.";
        private const string InvalidPinMessage = "Notfall-ID oder PIN ungültig. Nach mehreren Fehlversuchen wird die ID vorübergehend gesperrt.";
        private const string SessionExpiredMessage = "Sitzung abgelaufen. Bitte den Code erneut eingeben.";
        private const int MaxLockMinutes = 24 * 60;
        private const int AccessLogLimit = 100;
        private const int FailedLogLimit = 30;

        // Successful and failed attempts are loaded separately, so many failed attempts
        // can never push a real access out of the patient's log
        private static readonly List<EmergencyAccessOutcome> AccessOutcomes =
        [
            EmergencyAccessOutcome.Granted,
            EmergencyAccessOutcome.PendingApproval,
            EmergencyAccessOutcome.Denied
        ];

        private static readonly List<EmergencyAccessOutcome> FailedOutcomes =
        [
            EmergencyAccessOutcome.WrongPin,
            EmergencyAccessOutcome.Locked
        ];

        private readonly IEmergencyAccessRepository _repository;
        private readonly IPatientRepository _patientRepository;
        private readonly EmergencyOptions _options;

        public EmergencyAccessService(
            IEmergencyAccessRepository repository,
            IPatientRepository patientRepository,
            IOptions<EmergencyOptions> options)
        {
            _repository = repository;
            _patientRepository = patientRepository;
            _options = options.Value;
        }

        #region Patient side

        public async Task<ServiceResult> EnsureOwnerAsync(int patientId, string userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult.NotFound($"Patient {patientId} existiert nicht.");

            if (patient.UserId != userId)
                return ServiceResult.Forbidden("Kein Zugriff auf diesen Patienten.");

            return ServiceResult.Success();
        }

        public async Task<ServiceResult<EmergencyOverviewResponse>> GetOverviewAsync(int patientId, string userId)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<EmergencyOverviewResponse>(owner);

            var now = DateTime.UtcNow;
            var profile = await _repository.FindProfileAsync(patientId);
            var codes = await _repository.FindActiveCodesByPatientIdAsync(patientId);
            var openSessions = await _repository.FindOpenSessionsByPatientIdAsync(patientId, now);
            var pending = await _repository.FindPendingApprovalsAsync(patientId, now);

            return ServiceResult<EmergencyOverviewResponse>.Success(new EmergencyOverviewResponse
            {
                ConsentGivenAt = profile?.ConsentGivenAt,
                TreatmentRequiresApproval = profile?.TreatmentRequiresApproval ?? false,
                PortalBaseUrl = PortalBaseUrl,
                OneTimeLinkHours = _options.OneTimeLinkHours,
                ActiveCodes = codes
                    .Where(c => IsUsable(c, now))
                    .Select(c => ToStatus(c, now))
                    .ToList(),
                OpenSessionCount = openSessions.Count,
                PendingApprovalCount = pending.Count
            });
        }

        public async Task<ServiceResult<EmergencySettingsResponse>> SetConsentAsync(int patientId, string userId, bool given)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<EmergencySettingsResponse>(owner);

            // A double tap must not create the profile twice
            using var patientLock = await EmergencyLocks.AcquireAsync(PatientLockKey(patientId));

            var now = DateTime.UtcNow;
            var profile = await _repository.FindProfileAsync(patientId) ?? new EmergencyProfile { PatientId = patientId };

            if (given)
            {
                profile.ConsentGivenAt ??= now;
            }
            else
            {
                // Withdrawing consent ends everything right away
                profile.ConsentGivenAt = null;
                await DeactivateCodesAsync(await _repository.FindActiveCodesByPatientIdAsync(patientId), now);
                await _repository.RevokeSessionsAsync(patientId, now);
            }

            await _repository.SaveProfileAsync(profile);
            return ServiceResult<EmergencySettingsResponse>.Success(await BuildSettingsAsync(patientId, profile));
        }

        public async Task<ServiceResult<GeneratedEmergencyCodeResponse>> RegenerateCodeAsync(int patientId, string userId, EmergencyCodeType type)
        {
            if (type == EmergencyCodeType.OneTime)
                return ServiceResult<GeneratedEmergencyCodeResponse>.Invalid("Einmal-Links werden über einen eigenen Endpunkt erstellt.");

            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<GeneratedEmergencyCodeResponse>(owner);

            var consent = await EnsureConsentAsync(patientId);
            if (!consent.IsSuccess) return Fail<GeneratedEmergencyCodeResponse>(consent);

            // Two regenerate requests at once must not leave two active codes behind
            using var patientLock = await EmergencyLocks.AcquireAsync(PatientLockKey(patientId));

            var now = DateTime.UtcNow;

            // Every old code of this type stops working immediately, the other code type stays untouched
            await DeactivateCodesAsync(await FindActiveCodesAsync(patientId, type), now);

            var pin = CodeHasher.CreatePin();
            var (code, token) = await CreateCodeAsync(patientId, type, CodeHasher.HashPin(pin), null);

            return ServiceResult<GeneratedEmergencyCodeResponse>.Success(ToGenerated(code, token, pin));
        }

        public async Task<ServiceResult> DeactivateCodeAsync(int patientId, string userId, EmergencyCodeType type)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return owner;

            using var patientLock = await EmergencyLocks.AcquireAsync(PatientLockKey(patientId));

            var codes = await FindActiveCodesAsync(patientId, type);
            if (codes.Count == 0)
                return ServiceResult.NotFound("Es gibt keinen aktiven Code dieser Art.");

            await DeactivateCodesAsync(codes, DateTime.UtcNow);
            return ServiceResult.Success();
        }

        public async Task<ServiceResult<GeneratedEmergencyCodeResponse>> CreateOneTimeLinkAsync(int patientId, string userId)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<GeneratedEmergencyCodeResponse>(owner);

            var consent = await EnsureConsentAsync(patientId);
            if (!consent.IsSuccess) return Fail<GeneratedEmergencyCodeResponse>(consent);

            using var patientLock = await EmergencyLocks.AcquireAsync(PatientLockKey(patientId));

            var now = DateTime.UtcNow;

            // Only one unused link at a time keeps the overview simple. Sessions of an already used
            // link keep running, a new link for the next appointment should not end them.
            foreach (var existing in await FindActiveCodesAsync(patientId, EmergencyCodeType.OneTime))
            {
                existing.IsActive = false;
                existing.DeactivatedAt = now;
            }
            await _repository.SaveChangesAsync();

            var (code, token) = await CreateCodeAsync(
                patientId,
                EmergencyCodeType.OneTime,
                pinHash: null,
                expiresAt: now.AddHours(_options.OneTimeLinkHours));

            return ServiceResult<GeneratedEmergencyCodeResponse>.Success(ToGenerated(code, token, null));
        }

        public async Task<ServiceResult<EmergencySettingsResponse>> GetSettingsAsync(int patientId, string userId)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<EmergencySettingsResponse>(owner);

            var profile = await _repository.FindProfileAsync(patientId);
            return ServiceResult<EmergencySettingsResponse>.Success(await BuildSettingsAsync(patientId, profile));
        }

        public async Task<ServiceResult<EmergencySettingsResponse>> UpdateSettingsAsync(int patientId, string userId, UpdateEmergencySettingsRequest request)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<EmergencySettingsResponse>(owner);

            // Validate everything first, so an invalid request changes nothing
            var rows = new Dictionary<EmergencyDataCategory, EmergencyCategorySetting>();
            foreach (var row in request.Categories)
            {
                if (!TryParseCategory(row.Category, out var category))
                    return ServiceResult<EmergencySettingsResponse>.Invalid($"Unbekannte Kategorie: {row.Category}");

                if (!rows.TryAdd(category, row))
                    return ServiceResult<EmergencySettingsResponse>.Invalid($"Kategorie doppelt angegeben: {row.Category}");
            }

            // Categories missing in the request keep their current value
            var settings = new List<EmergencyShareSetting>();
            foreach (var (category, row) in rows)
            {
                settings.Add(new EmergencyShareSetting
                {
                    PatientId = patientId,
                    CodeType = EmergencyCodeType.Emergency,
                    Category = category,
                    // Enforced on the server, the app only greys the box out
                    IsEnabled = row.Emergency && !EmergencySharePolicy.IsExtended(category)
                });

                settings.Add(new EmergencyShareSetting
                {
                    PatientId = patientId,
                    CodeType = EmergencyCodeType.Treatment,
                    Category = category,
                    IsEnabled = row.Treatment
                });
            }

            using var patientLock = await EmergencyLocks.AcquireAsync(PatientLockKey(patientId));

            await _repository.SaveShareSettingsAsync(patientId, settings);

            var profile = await _repository.FindProfileAsync(patientId) ?? new EmergencyProfile { PatientId = patientId };
            profile.TreatmentRequiresApproval = request.TreatmentRequiresApproval;
            await _repository.SaveProfileAsync(profile);

            return ServiceResult<EmergencySettingsResponse>.Success(await BuildSettingsAsync(patientId, profile));
        }

        public async Task<ServiceResult<IEnumerable<EmergencyAccessLogResponse>>> GetLogsAsync(int patientId, string userId)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<IEnumerable<EmergencyAccessLogResponse>>(owner);

            var now = DateTime.UtcNow;
            var accesses = await _repository.FindLogsByPatientIdAsync(patientId, AccessOutcomes, AccessLogLimit);
            var failures = await _repository.FindLogsByPatientIdAsync(patientId, FailedOutcomes, FailedLogLimit);

            var runningByLogId = (await _repository.FindOpenSessionsByPatientIdAsync(patientId, now))
                .Where(s => s.AccessLogId != null)
                .GroupBy(s => s.AccessLogId!.Value)
                .ToDictionary(g => g.Key, g => g.First());

            var response = accesses
                .Concat(failures)
                .OrderByDescending(log => log.AccessedAt)
                .Select(log =>
                {
                    runningByLogId.TryGetValue(log.Id, out var running);
                    return new EmergencyAccessLogResponse
                    {
                        Id = log.Id,
                        CodeType = log.CodeType.ToString(),
                        Method = log.Method.ToString(),
                        Outcome = DisplayOutcome(log, now),
                        AccessedAt = log.AccessedAt,
                        IpAddress = log.IpAddress,
                        DeviceType = log.DeviceType,
                        AccessorName = log.AccessorName,
                        AccessorInstitution = log.AccessorInstitution,
                        RunningSessionId = running?.Id,
                        RunningUntil = running?.ExpiresAt
                    };
                })
                .ToList();

            return ServiceResult<IEnumerable<EmergencyAccessLogResponse>>.Success(response);
        }

        public async Task<ServiceResult<IEnumerable<PendingApprovalResponse>>> GetPendingApprovalsAsync(int patientId, string userId)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<IEnumerable<PendingApprovalResponse>>(owner);

            var pending = await _repository.FindPendingApprovalsAsync(patientId, DateTime.UtcNow);

            var response = pending.Select(s => new PendingApprovalResponse
            {
                SessionId = s.Id,
                RequestedAt = s.CreatedAt,
                ApprovalExpiresAt = s.ApprovalExpiresAt,
                AccessorName = s.AccessLog?.AccessorName,
                AccessorInstitution = s.AccessLog?.AccessorInstitution,
                DeviceType = s.AccessLog?.DeviceType,
                SessionMinutes = SessionMinutesFor(s.CodeType)
            });

            return ServiceResult<IEnumerable<PendingApprovalResponse>>.Success(response.ToList());
        }

        public async Task<ServiceResult> DecideApprovalAsync(int patientId, string userId, int sessionId, bool approve)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return owner;

            var session = await _repository.FindSessionByIdAsync(sessionId);
            if (session == null || session.PatientId != patientId)
                return ServiceResult.NotFound("Anfrage nicht gefunden.");

            var now = DateTime.UtcNow;
            var isOpen = session.ApprovalState == EmergencyApprovalState.Pending
                && session.RevokedAt == null
                && session.ApprovalExpiresAt > now;

            if (!isOpen)
                return ServiceResult.Conflict("Diese Anfrage ist nicht mehr offen.");

            if (approve)
            {
                // The reading time starts with the approval, not with the request
                session.ApprovalState = EmergencyApprovalState.Approved;
                session.ExpiresAt = now.AddMinutes(SessionMinutesFor(session.CodeType));
                if (session.AccessLog != null) session.AccessLog.Outcome = EmergencyAccessOutcome.Granted;
            }
            else
            {
                session.ApprovalState = EmergencyApprovalState.Denied;
                session.RevokedAt = now;
                if (session.AccessLog != null) session.AccessLog.Outcome = EmergencyAccessOutcome.Denied;
            }

            await _repository.SaveChangesAsync();
            return ServiceResult.Success();
        }

        public async Task<ServiceResult<int>> RevokeAllSessionsAsync(int patientId, string userId)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return Fail<int>(owner);

            var count = await _repository.RevokeSessionsAsync(patientId, DateTime.UtcNow);
            return ServiceResult<int>.Success(count);
        }

        public async Task<ServiceResult> RevokeSessionAsync(int patientId, string userId, int sessionId)
        {
            var owner = await EnsureOwnerAsync(patientId, userId);
            if (!owner.IsSuccess) return owner;

            var session = await _repository.FindSessionByIdAsync(sessionId);
            if (session == null || session.PatientId != patientId)
                return ServiceResult.NotFound("Sitzung nicht gefunden.");

            if (session.RevokedAt == null)
            {
                session.RevokedAt = DateTime.UtcNow;
                await _repository.SaveChangesAsync();
            }

            return ServiceResult.Success();
        }

        #endregion

        #region Portal side

        public async Task<ServiceResult<EmergencySessionResponse>> StartSessionWithTokenAsync(TokenSessionRequest request, EmergencyClientInfo client)
        {
            if (!request.Consent)
                return ServiceResult<EmergencySessionResponse>.Invalid("Bitte bestätigen Sie den Zweck des Zugriffs.");

            if (string.IsNullOrWhiteSpace(request.Token))
                return ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidCodeMessage);

            var tokenHash = CodeHasher.HashToken(request.Token.Trim());

            // Exchanges of the same token run one after another, so a one time link cannot be used twice
            using var codeLock = await EmergencyLocks.AcquireAsync($"token:{tokenHash}");

            var now = DateTime.UtcNow;
            var code = await _repository.FindCodeByTokenHashAsync(tokenHash);

            if (code == null || !IsUsable(code, now))
                return ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidCodeMessage);

            var method = code.Type == EmergencyCodeType.OneTime ? EmergencyAccessMethod.OneTimeLink : EmergencyAccessMethod.QrCode;
            return await CreateSessionAsync(code, method, request.AccessorName, request.AccessorInstitution, client, now);
        }

        public async Task<ServiceResult<EmergencySessionResponse>> StartSessionWithPinAsync(PinSessionRequest request, EmergencyClientInfo client)
        {
            if (!request.Consent)
                return ServiceResult<EmergencySessionResponse>.Invalid("Bitte bestätigen Sie den Zweck des Zugriffs.");

            var publicId = CodeHasher.NormalizePublicId(request.PublicId);
            var pin = request.Pin?.Trim() ?? string.Empty;

            if (publicId.Length != 8 || pin.Length != 6 || !pin.All(char.IsDigit))
                return ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidPinMessage);

            var code = await _repository.FindCodeByPublicIdAsync(publicId);

            // Ids that can never work do not take a lock, so guessing random ids cannot slow down real ones.
            // The same slow check as for a real id keeps the response time from revealing which ids exist.
            if (code == null || code.Type == EmergencyCodeType.OneTime || code.PinHash == null)
            {
                CodeHasher.VerifyAgainstDummy(pin);
                return ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidPinMessage);
            }

            ServiceResult<EmergencySessionResponse> result;
            bool needsDummyCheck;

            // Attempts for the same id run one after another, so parallel guesses cannot skip the lock
            using (await EmergencyLocks.AcquireAsync($"pin:{publicId}"))
            {
                (result, needsDummyCheck) = await CheckPinAsync(code, pin, request, client);
            }

            // Done after the lock is released, so a locked or inactive id does not hold up other ids
            if (needsDummyCheck)
                CodeHasher.VerifyAgainstDummy(pin);

            return result;
        }

        // Runs inside the lock of the id. Returns whether the caller still has to spend the time
        // of a PIN check, so every rejected attempt takes about as long as a real wrong PIN.
        private async Task<(ServiceResult<EmergencySessionResponse> Result, bool NeedsDummyCheck)> CheckPinAsync(
            EmergencyAccessCode code, string pin, PinSessionRequest request, EmergencyClientInfo client)
        {
            // Another attempt may have changed the counter while this one was waiting for the lock
            var exists = await _repository.ReloadCodeAsync(code);
            var now = DateTime.UtcNow;

            if (!exists || code.PinHash == null || !IsUsable(code, now))
                return (ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidPinMessage), true);

            // While locked even the correct PIN is rejected. The answer looks like a wrong PIN on purpose.
            if (IsLocked(code, now))
            {
                await LogAttemptAsync(code, EmergencyAccessMethod.Pin, EmergencyAccessOutcome.Locked, request.AccessorName, request.AccessorInstitution, client, now);
                return (ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidPinMessage), true);
            }

            if (!CodeHasher.VerifyPin(pin, code.PinHash))
            {
                RegisterFailedAttempt(code, now);
                await _repository.SaveChangesAsync();
                await LogAttemptAsync(code, EmergencyAccessMethod.Pin, EmergencyAccessOutcome.WrongPin, request.AccessorName, request.AccessorInstitution, client, now);
                return (ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidPinMessage), false);
            }

            if (code.FailedAttempts != 0 || code.LockedUntil != null)
            {
                code.FailedAttempts = 0;
                code.LockedUntil = null;
                await _repository.SaveChangesAsync();
            }

            var session = await CreateSessionAsync(code, EmergencyAccessMethod.Pin, request.AccessorName, request.AccessorInstitution, client, now);
            return (session, false);
        }

        public async Task<ServiceResult<EmergencySessionResponse>> GetSessionStatusAsync(string? sessionToken)
        {
            var session = await FindSessionAsync(sessionToken);
            var now = DateTime.UtcNow;

            if (session == null)
                return ServiceResult<EmergencySessionResponse>.Unauthorized(SessionExpiredMessage);

            // A denied request keeps answering "Denied" until its approval window is over,
            // so the waiting portal can tell the doctor instead of showing a generic error
            if (session.ApprovalState == EmergencyApprovalState.Denied)
                return ServiceResult<EmergencySessionResponse>.Success(ToSessionResponse(session, null, now));

            if (!IsSessionAlive(session, now))
                return ServiceResult<EmergencySessionResponse>.Unauthorized(SessionExpiredMessage);

            return ServiceResult<EmergencySessionResponse>.Success(ToSessionResponse(session, null, now));
        }

        public async Task<ServiceResult<EmergencyAccessSession>> GetReadableSessionAsync(string? sessionToken)
        {
            var session = await FindSessionAsync(sessionToken);
            var now = DateTime.UtcNow;

            if (session == null || !IsSessionAlive(session, now))
                return ServiceResult<EmergencyAccessSession>.Unauthorized(SessionExpiredMessage);

            return session.ApprovalState switch
            {
                EmergencyApprovalState.Pending => ServiceResult<EmergencyAccessSession>.Forbidden("Die Freigabe durch die Person steht noch aus."),
                EmergencyApprovalState.Denied => ServiceResult<EmergencyAccessSession>.Forbidden("Der Zugriff wurde abgelehnt."),
                _ => ServiceResult<EmergencyAccessSession>.Success(session)
            };
        }

        public async Task<ServiceResult> EndSessionAsync(string? sessionToken)
        {
            var session = await FindSessionAsync(sessionToken);

            if (session != null && session.RevokedAt == null)
            {
                session.RevokedAt = DateTime.UtcNow;
                await _repository.SaveChangesAsync();
            }

            return ServiceResult.Success();
        }

        #endregion

        #region Helpers

        private string PortalBaseUrl => _options.PortalBaseUrl.TrimEnd('/');

        private static string PatientLockKey(int patientId) => $"patient:{patientId}";

        private async Task<ServiceResult<EmergencySessionResponse>> CreateSessionAsync(
            EmergencyAccessCode code,
            EmergencyAccessMethod method,
            string? accessorName,
            string? accessorInstitution,
            EmergencyClientInfo client,
            DateTime now)
        {
            var profile = await _repository.FindProfileAsync(code.PatientId);

            if (profile == null || profile.ConsentGivenAt == null)
                return ServiceResult<EmergencySessionResponse>.Unauthorized(InvalidCodeMessage);

            // Team decision: only the permanent treatment code asks for approval. The patient creates
            // a one time link on purpose for an appointment, often without being there in person.
            var needsApproval = code.Type == EmergencyCodeType.Treatment && profile.TreatmentRequiresApproval;

            var log = await LogAttemptAsync(
                code,
                method,
                needsApproval ? EmergencyAccessOutcome.PendingApproval : EmergencyAccessOutcome.Granted,
                accessorName,
                accessorInstitution,
                client,
                now);

            var sessionToken = CodeHasher.CreateToken();
            var approvalExpiresAt = now.AddMinutes(_options.ApprovalWindowMinutes);

            var session = new EmergencyAccessSession
            {
                PatientId = code.PatientId,
                CodeId = code.Id,
                CodeType = code.Type,
                SessionTokenHash = CodeHasher.HashToken(sessionToken),
                ApprovalState = needsApproval ? EmergencyApprovalState.Pending : EmergencyApprovalState.NotRequired,
                ApprovalExpiresAt = needsApproval ? approvalExpiresAt : null,
                CreatedAt = now,
                // A pending session cannot read anything, it only lives as long as the approval window
                ExpiresAt = needsApproval ? approvalExpiresAt : now.AddMinutes(SessionMinutesFor(code.Type)),
                AccessLogId = log.Id
            };

            await _repository.AddSessionAsync(session);

            // A one time link is used up by the first successful exchange
            if (code.Type == EmergencyCodeType.OneTime)
            {
                code.IsActive = false;
                code.DeactivatedAt = now;
                await _repository.SaveChangesAsync();
            }

            return ServiceResult<EmergencySessionResponse>.Success(ToSessionResponse(session, sessionToken, now));
        }

        private async Task<EmergencyAccessLog> LogAttemptAsync(
            EmergencyAccessCode code,
            EmergencyAccessMethod method,
            EmergencyAccessOutcome outcome,
            string? accessorName,
            string? accessorInstitution,
            EmergencyClientInfo client,
            DateTime now)
        {
            return await _repository.AddLogAsync(new EmergencyAccessLog
            {
                PatientId = code.PatientId,
                CodeType = code.Type,
                Method = method,
                Outcome = outcome,
                AccessedAt = now,
                IpAddress = Clip(client.IpAddress, 45),
                DeviceType = Clip(DescribeDevice(client.UserAgent), 100),
                AccessorName = Clip(accessorName, 100),
                AccessorInstitution = Clip(accessorInstitution, 150)
            });
        }

        // Every full round of failed attempts locks the id, each further round twice as long
        private void RegisterFailedAttempt(EmergencyAccessCode code, DateTime now)
        {
            code.FailedAttempts++;

            if (code.FailedAttempts % _options.MaxFailedAttempts != 0)
                return;

            var round = code.FailedAttempts / _options.MaxFailedAttempts;
            var minutes = Math.Min(_options.LockMinutes * Math.Pow(2, Math.Min(round - 1, 16)), MaxLockMinutes);
            code.LockedUntil = now.AddMinutes(minutes);
        }

        private async Task<(EmergencyAccessCode Code, string Token)> CreateCodeAsync(int patientId, EmergencyCodeType type, string? pinHash, DateTime? expiresAt)
        {
            var token = CodeHasher.CreateToken();

            var code = new EmergencyAccessCode
            {
                PatientId = patientId,
                Type = type,
                PublicId = await CreateUniquePublicIdAsync(),
                TokenHash = CodeHasher.HashToken(token),
                PinHash = pinHash,
                IsActive = true,
                ExpiresAt = expiresAt,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddCodeAsync(code);
            return (code, token);
        }

        private async Task<string> CreateUniquePublicIdAsync()
        {
            for (var attempt = 0; attempt < 10; attempt++)
            {
                var candidate = CodeHasher.CreatePublicId();
                if (!await _repository.PublicIdExistsAsync(candidate))
                    return candidate;
            }

            throw new InvalidOperationException("Could not create a unique emergency id.");
        }

        private async Task<List<EmergencyAccessCode>> FindActiveCodesAsync(int patientId, EmergencyCodeType type)
        {
            return (await _repository.FindActiveCodesByPatientIdAsync(patientId))
                .Where(c => c.Type == type)
                .ToList();
        }

        // Deactivates the codes and ends their sessions
        private async Task DeactivateCodesAsync(List<EmergencyAccessCode> codes, DateTime now)
        {
            foreach (var code in codes)
            {
                code.IsActive = false;
                code.DeactivatedAt = now;
            }

            await _repository.SaveChangesAsync();

            foreach (var code in codes)
            {
                await _repository.RevokeSessionsAsync(code.PatientId, now, code.Id);
            }
        }

        private async Task<ServiceResult> EnsureConsentAsync(int patientId)
        {
            var profile = await _repository.FindProfileAsync(patientId);

            if (profile?.ConsentGivenAt == null)
                return ServiceResult.Conflict("Bitte zuerst der Freigabe im Notfall zustimmen.");

            return ServiceResult.Success();
        }

        private async Task<EmergencySettingsResponse> BuildSettingsAsync(int patientId, EmergencyProfile? profile)
        {
            var stored = await _repository.FindShareSettingsAsync(patientId);
            var emergency = EmergencySharePolicy.Resolve(stored, EmergencyCodeType.Emergency);
            var treatment = EmergencySharePolicy.Resolve(stored, EmergencyCodeType.Treatment);

            return new EmergencySettingsResponse
            {
                ConsentGivenAt = profile?.ConsentGivenAt,
                TreatmentRequiresApproval = profile?.TreatmentRequiresApproval ?? false,
                Categories = Enum.GetValues<EmergencyDataCategory>()
                    .Select(category => new EmergencyCategorySetting
                    {
                        Category = category.ToString(),
                        Emergency = emergency.Contains(category),
                        Treatment = treatment.Contains(category),
                        IsExtended = EmergencySharePolicy.IsExtended(category)
                    })
                    .ToList()
            };
        }

        private async Task<EmergencyAccessSession?> FindSessionAsync(string? sessionToken)
        {
            if (string.IsNullOrWhiteSpace(sessionToken))
                return null;

            return await _repository.FindSessionByTokenHashAsync(CodeHasher.HashToken(sessionToken.Trim()));
        }

        // Only names of the enum count, numbers like "0" or combinations like "A,B" are rejected
        private static bool TryParseCategory(string? value, out EmergencyDataCategory category)
        {
            category = default;

            if (string.IsNullOrWhiteSpace(value) || value.Any(c => !char.IsLetter(c)))
                return false;

            return Enum.TryParse(value, true, out category) && Enum.IsDefined(category);
        }

        // An approval request nobody answered in time is shown as expired instead of waiting forever
        private string DisplayOutcome(EmergencyAccessLog log, DateTime now)
        {
            var expired = log.Outcome == EmergencyAccessOutcome.PendingApproval
                && log.AccessedAt.AddMinutes(_options.ApprovalWindowMinutes) <= now;

            return expired ? "Expired" : log.Outcome.ToString();
        }

        // Regenerating or deactivating a code also ends its sessions. One time codes are
        // deactivated on first use on purpose, so their session must survive that.
        private static bool IsSessionAlive(EmergencyAccessSession session, DateTime now)
        {
            if (session.RevokedAt != null || session.ExpiresAt <= now)
                return false;

            if (session.CodeType != EmergencyCodeType.OneTime && session.Code != null && !session.Code.IsActive)
                return false;

            return true;
        }

        private static bool IsUsable(EmergencyAccessCode code, DateTime now)
        {
            return code.IsActive && (code.ExpiresAt == null || code.ExpiresAt > now);
        }

        private static bool IsLocked(EmergencyAccessCode code, DateTime now)
        {
            return code.LockedUntil != null && code.LockedUntil > now;
        }

        private int SessionMinutesFor(EmergencyCodeType type)
        {
            return type == EmergencyCodeType.Emergency ? _options.EmergencySessionMinutes : _options.TreatmentSessionMinutes;
        }

        // The token goes behind # so it is never sent to the web host and never lands in its logs
        private GeneratedEmergencyCodeResponse ToGenerated(EmergencyAccessCode code, string token, string? pin)
        {
            return new GeneratedEmergencyCodeResponse
            {
                Type = code.Type.ToString(),
                PublicId = code.PublicId,
                Token = token,
                Pin = pin,
                AccessUrl = $"{PortalBaseUrl}/a#{token}",
                PortalUrl = PortalBaseUrl,
                CreatedAt = code.CreatedAt,
                ExpiresAt = code.ExpiresAt
            };
        }

        private static EmergencyCodeStatusResponse ToStatus(EmergencyAccessCode code, DateTime now)
        {
            var isLocked = IsLocked(code, now);

            return new EmergencyCodeStatusResponse
            {
                Type = code.Type.ToString(),
                PublicId = code.PublicId,
                CreatedAt = code.CreatedAt,
                ExpiresAt = code.ExpiresAt,
                IsLocked = isLocked,
                LockedUntil = isLocked ? code.LockedUntil : null
            };
        }

        private static EmergencySessionResponse ToSessionResponse(EmergencyAccessSession session, string? sessionToken, DateTime now)
        {
            var isPending = session.ApprovalState == EmergencyApprovalState.Pending && session.ApprovalExpiresAt != null;

            return new EmergencySessionResponse
            {
                SessionToken = sessionToken,
                CodeType = session.CodeType.ToString(),
                ApprovalState = session.ApprovalState.ToString(),
                ExpiresAt = session.ExpiresAt,
                ApprovalExpiresAt = session.ApprovalExpiresAt,
                SecondsRemaining = SecondsUntil(session.ExpiresAt, now),
                ApprovalSecondsRemaining = isPending ? SecondsUntil(session.ApprovalExpiresAt!.Value, now) : null
            };
        }

        private static int SecondsUntil(DateTime end, DateTime now)
        {
            return Math.Max(0, (int)Math.Ceiling((end - now).TotalSeconds));
        }

        private static ServiceResult<T> Fail<T>(ServiceResult error)
        {
            return new ServiceResult<T> { ErrorType = error.ErrorType, ErrorMessage = error.ErrorMessage };
        }

        private static string? Clip(string? value, int maxLength)
        {
            if (string.IsNullOrWhiteSpace(value)) return null;
            var trimmed = value.Trim();
            return trimmed.Length <= maxLength ? trimmed : trimmed[..maxLength];
        }

        // Rough device label for the access log, no fingerprinting
        private static string DescribeDevice(string? userAgent)
        {
            if (string.IsNullOrWhiteSpace(userAgent)) return "Unbekanntes Gerät";

            var os = userAgent switch
            {
                var ua when ua.Contains("iPhone") => "iPhone",
                var ua when ua.Contains("iPad") => "iPad",
                var ua when ua.Contains("Android") => "Android",
                var ua when ua.Contains("Windows") => "Windows PC",
                var ua when ua.Contains("Macintosh") => "Mac",
                var ua when ua.Contains("Linux") => "Linux",
                _ => "Unbekanntes Gerät"
            };

            var browser = userAgent switch
            {
                var ua when ua.Contains("Edg/") => "Edge",
                var ua when ua.Contains("OPR/") => "Opera",
                var ua when ua.Contains("Firefox/") => "Firefox",
                var ua when ua.Contains("Chrome/") => "Chrome",
                var ua when ua.Contains("Safari/") => "Safari",
                _ => null
            };

            return browser == null ? os : $"{os}, {browser}";
        }

        #endregion
    }
}
