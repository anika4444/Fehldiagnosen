using Backend.Application.Common.Results;
using Backend.Application.Services.EmergencyAccessService;
using Backend.Application.Services.EmergencyAccessService.Dto;
using Backend.Application.Services.EmergencyDataService;
using Backend.Application.Services.EmergencyDataService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Backend.Api.Controller;

// Public, read only API of the emergency portal. There is no login: the QR token or
// emergency id plus PIN is exchanged for a short session token, sent in a header.
[AllowAnonymous]
[ApiController]
[Route("api/emergency")]
[EnableCors(EmergencyPortalController.CorsPolicy)]
[EnableRateLimiting(EmergencyPortalController.ReadRateLimit)]
public class EmergencyPortalController : BaseApiController
{
    public const string CorsPolicy = "EmergencyPortal";
    public const string LoginRateLimit = "emergency-login";
    public const string ReadRateLimit = "emergency-read";
    public const string SessionHeader = "X-Emergency-Session";

    private readonly IEmergencyAccessService _accessService;
    private readonly IEmergencyDataService _dataService;

    public EmergencyPortalController(IEmergencyAccessService accessService, IEmergencyDataService dataService)
    {
        _accessService = accessService;
        _dataService = dataService;
    }

    [HttpPost("sessions/token")]
    [EnableRateLimiting(LoginRateLimit)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<EmergencySessionResponse>> StartWithToken([FromBody] TokenSessionRequest request)
    {
        var result = await _accessService.StartSessionWithTokenAsync(request, GetClientInfo());

        if (result.IsSuccess)
            return Ok(result.Data);

        return PortalError(result);
    }

    [HttpPost("sessions/pin")]
    [EnableRateLimiting(LoginRateLimit)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task<ActionResult<EmergencySessionResponse>> StartWithPin([FromBody] PinSessionRequest request)
    {
        var result = await _accessService.StartSessionWithPinAsync(request, GetClientInfo());

        if (result.IsSuccess)
            return Ok(result.Data);

        return PortalError(result);
    }

    // Polled by the portal while the patient has not yet approved
    [HttpGet("session")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<EmergencySessionResponse>> GetSessionStatus()
    {
        var result = await _accessService.GetSessionStatusAsync(GetSessionToken());

        if (result.IsSuccess)
            return Ok(result.Data);

        return PortalError(result);
    }

    [HttpDelete("session")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> EndSession()
    {
        await _accessService.EndSessionAsync(GetSessionToken());
        return NoContent();
    }

    [HttpGet("data")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<EmergencyDataResponse>> GetData()
    {
        var session = await _accessService.GetReadableSessionAsync(GetSessionToken());
        if (!session.IsSuccess)
            return PortalError(session);

        var result = await _dataService.GetDataAsync(session.Data!.PatientId, session.Data.CodeType, session.Data.ExpiresAt);

        if (result.IsSuccess)
            return Ok(result.Data);

        return PortalError(result);
    }

    // Interactions and AI summary are slower, the portal loads them after the core data
    [HttpGet("insights")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<EmergencyInsightsResponse>> GetInsights()
    {
        var session = await _accessService.GetReadableSessionAsync(GetSessionToken());
        if (!session.IsSuccess)
            return PortalError(session);

        var result = await _dataService.GetInsightsAsync(session.Data!.PatientId, session.Data.CodeType, session.Data.Id);

        if (result.IsSuccess)
            return Ok(result.Data);

        return PortalError(result);
    }

    private string? GetSessionToken()
    {
        return Request.Headers.TryGetValue(SessionHeader, out var value) ? value.ToString() : null;
    }

    private EmergencyClientInfo GetClientInfo()
    {
        return new EmergencyClientInfo
        {
            IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
            UserAgent = Request.Headers.UserAgent.ToString()
        };
    }

    // The portal always gets a JSON body with a readable message
    private ObjectResult PortalError(ServiceResult result)
    {
        var status = result.ErrorType switch
        {
            ServiceErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ServiceErrorType.Forbidden => StatusCodes.Status403Forbidden,
            ServiceErrorType.NotFound => StatusCodes.Status404NotFound,
            ServiceErrorType.ValidationError => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };

        return StatusCode(status, new { message = result.ErrorMessage ?? "Unbekannter Fehler." });
    }
}
