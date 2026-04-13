using Backend.Application.Services.HealthTipService;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
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
            var result = _healthTipService.GetTodayHealthTipAsync();
            if (result.IsSuccess)
            {
                return Ok(new
                {
                    Tip = result.Data
                });
            }

            return BadRequest();
        }
    }
}
