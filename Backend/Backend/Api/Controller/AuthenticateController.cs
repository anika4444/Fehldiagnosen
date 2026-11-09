using Backend.Application.Common.Results;
using Backend.Application.Services.UserService;
using Backend.Application.Services.UserService.Dto;
using Backend.Infrastructure.Observability;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [ApiController]
    [Route("api/authenticate")]
    public class AuthenticateController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly ILogger<AuthenticateController> _logger;

        public AuthenticateController(IUserService userService, ILogger<AuthenticateController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _userService.Register(registerDto);

            AppMetrics.Registrations.WithLabels(result.IsSuccess ? "success" : "failure").Inc();
            if(result.IsSuccess)
            {
                _logger.LogInformation("Neuer Benutzer registriert (Rolle {Role})", registerDto.Role);
                return Ok(result);
            }

            _logger.LogWarning("Registrierung abgelehnt: {ErrorType}", result.ErrorType);

            return result.ErrorType switch
            {
                ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
                ServiceErrorType.Conflict => Conflict(result.ErrorMessage),
                ServiceErrorType.Unauthorized => Unauthorized(result.ErrorMessage),
                ServiceErrorType.ValidationError => BadRequest(result.ErrorMessage),
                _ => BadRequest(result.ErrorMessage)
            };
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await _userService.Login(loginDto);

            AppMetrics.LoginAttempts.WithLabels(result.IsSuccess ? "success" : "failure").Inc();
            if(result.IsSuccess)
            {
                return Ok(result);
            }

            // Ohne Benutzernamen: Fehlversuche sollen keine Rückschlüsse auf existierende Konten erlauben
            _logger.LogWarning("Anmeldung fehlgeschlagen: {ErrorType}", result.ErrorType);

            return result.ErrorType switch
            {
                ServiceErrorType.Unauthorized => Unauthorized(result.ErrorMessage),
                _ => BadRequest(result.ErrorMessage)
            };
        }
    }
}
