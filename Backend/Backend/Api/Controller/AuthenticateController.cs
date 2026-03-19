using Backend.Application.Common.Results;
using Backend.Application.Services.UserService;
using Backend.Application.Services.UserService.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [ApiController]
    [Route("api/authenticate")]
    public class AuthenticateController : ControllerBase
    {

        private readonly IUserService _userService;

        public AuthenticateController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _userService.Register(registerDto);

            if(result.IsSuccess)
            {
                return Ok(result);
            }

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
            return Ok(await _userService.Login(loginDto));
        }
    }
}
