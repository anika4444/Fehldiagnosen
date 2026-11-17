using Backend.Application.Services.HealthTipService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/health-tip")]
    public class HealthTipController : BaseApiController
    {
        private readonly IHealthTipService _healthTipService;

        public HealthTipController(IHealthTipService healthTipService)
        {
            _healthTipService = healthTipService;
        }

        [HttpGet("today")]
        public IActionResult GetTodayHealthTip()
        {
            var result = _healthTipService.GetTodayHealthTip();
            if (result.IsSuccess)
            {
                return Ok(new
                {
                    Tip = result.Data
                });
            }

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }
    }
}
