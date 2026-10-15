using Backend.Application.Services.EmergencyAccessService;
using Backend.Application.Services.EmergencyAccessService.Dto;
using Backend.Application.Services.EmergencyDataService;
using Backend.Application.Services.EmergencyDataService.Dto;
using Backend.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

// Patient side of the emergency feature. Only the patient may manage his own codes,
// so unlike the other controllers there is no doctor shortcut via IsArzt() here.
[Authorize]
[ApiController]
[Route("api/patients/{patientId}/emergency")]
public class EmergencyCodeController : BaseApiController
{
    private readonly IEmergencyAccessService _accessService;
    private readonly IEmergencyDataService _dataService;

    public EmergencyCodeController(IEmergencyAccessService accessService, IEmergencyDataService dataService)
    {
        _accessService = accessService;
        _dataService = dataService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<EmergencyOverviewResponse>> GetOverview(int patientId)
    {
        var result = await _accessService.GetOverviewAsync(patientId, GetCurrentUserId());

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPut("consent")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<EmergencySettingsResponse>> SetConsent(int patientId, [FromBody] EmergencyConsentRequest request)
    {
        var result = await _accessService.SetConsentAsync(patientId, GetCurrentUserId(), request.Given);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #region Codes

    [HttpPost("codes/{type}/regenerate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<GeneratedEmergencyCodeResponse>> RegenerateCode(int patientId, string type)
    {
        if (!TryParseCodeType(type, out var codeType))
            return BadRequest("Unbekannter Code-Typ.");

        var result = await _accessService.RegenerateCodeAsync(patientId, GetCurrentUserId(), codeType);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("codes/{type}/deactivate")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeactivateCode(int patientId, string type)
    {
        // The one time link can be withdrawn here as well
        var codeType = EmergencyCodeType.OneTime;
        var isOneTime = type.Equals("onetime", StringComparison.OrdinalIgnoreCase);

        if (!isOneTime && !TryParseCodeType(type, out codeType))
            return BadRequest("Unbekannter Code-Typ.");

        var result = await _accessService.DeactivateCodeAsync(patientId, GetCurrentUserId(), codeType);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("one-time-link")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<GeneratedEmergencyCodeResponse>> CreateOneTimeLink(int patientId)
    {
        var result = await _accessService.CreateOneTimeLinkAsync(patientId, GetCurrentUserId());

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #endregion

    #region Settings

    [HttpGet("settings")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<EmergencySettingsResponse>> GetSettings(int patientId)
    {
        var result = await _accessService.GetSettingsAsync(patientId, GetCurrentUserId());

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPut("settings")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<EmergencySettingsResponse>> UpdateSettings(int patientId, [FromBody] UpdateEmergencySettingsRequest request)
    {
        var result = await _accessService.UpdateSettingsAsync(patientId, GetCurrentUserId(), request);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    // Shows the patient exactly what a helper would see, also used for the lock screen pass text
    [HttpGet("preview")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<EmergencyDataResponse>> GetPreview(int patientId, [FromQuery] string type = "emergency")
    {
        if (!TryParseCodeType(type, out var codeType))
            return BadRequest("Unbekannter Code-Typ.");

        var owner = await _accessService.EnsureOwnerAsync(patientId, GetCurrentUserId());
        if (!owner.IsSuccess)
            return HandleServiceError(owner.ErrorType, owner.ErrorMessage);

        var result = await _dataService.GetDataAsync(patientId, codeType, null);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #endregion

    #region Log, approvals, sessions

    [HttpGet("logs")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<EmergencyAccessLogResponse>>> GetLogs(int patientId)
    {
        var result = await _accessService.GetLogsAsync(patientId, GetCurrentUserId());

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpGet("approvals")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<PendingApprovalResponse>>> GetPendingApprovals(int patientId)
    {
        var result = await _accessService.GetPendingApprovalsAsync(patientId, GetCurrentUserId());

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("approvals/{sessionId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult> DecideApproval(int patientId, int sessionId, [FromBody] ApprovalDecisionRequest request)
    {
        var result = await _accessService.DecideApprovalAsync(patientId, GetCurrentUserId(), sessionId, request.Approve);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("sessions/revoke-all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> RevokeAllSessions(int patientId)
    {
        var result = await _accessService.RevokeAllSessionsAsync(patientId, GetCurrentUserId());

        if (result.IsSuccess)
            return Ok(new { revoked = result.Data });

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("sessions/{sessionId}/revoke")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> RevokeSession(int patientId, int sessionId)
    {
        var result = await _accessService.RevokeSessionAsync(patientId, GetCurrentUserId(), sessionId);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #endregion

    // Only the two permanent codes can be addressed by name
    private static bool TryParseCodeType(string value, out EmergencyCodeType codeType)
    {
        codeType = EmergencyCodeType.Emergency;

        if (value.Equals("emergency", StringComparison.OrdinalIgnoreCase))
            return true;

        if (value.Equals("treatment", StringComparison.OrdinalIgnoreCase))
        {
            codeType = EmergencyCodeType.Treatment;
            return true;
        }

        return false;
    }
}
