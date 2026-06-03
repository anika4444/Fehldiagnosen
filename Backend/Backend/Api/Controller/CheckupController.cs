using Backend.Application.Services.CheckupService;
using Backend.Application.Services.CheckupService.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/checkup")]
public class CheckupController : BaseApiController
{
    private readonly ICheckupService _checkupService;

    public CheckupController(ICheckupService checkupService)
    {
        _checkupService = checkupService;
    }

    [HttpGet("{patientId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GenerateCheckupSummary(
        [FromRoute] int patientId,
        [FromQuery] DateTime from,
        [FromQuery] DateTime to)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var request = new CheckupSummaryRequest { From = from, To = to };
        var result = await _checkupService.GenerateCheckupSummary(patientId, userId, request);

        if (result.IsSuccess)
        {
            return Ok(result.Data);
        }

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}