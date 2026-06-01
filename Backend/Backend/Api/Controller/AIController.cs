using Backend.Application.Services.AIService;
using Backend.Application.Services.AIService.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/ai")]
public class AIController : BaseApiController
{
    private readonly IAIService _aiService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AIController> _logger;

    public AIController(
        IAIService aiService,
        IConfiguration configuration,
        ILogger<AIController> logger)
    {
        _aiService = aiService;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet("{id}/explain-medical-history/{medicalHistoryEntryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ExplainMedicalHistory(
        [FromRoute] int id,
        [FromRoute] int medicalHistoryEntryId,
        [FromBody] ExplainMedicalHistoryRequest? request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();

        var result = await _aiService.ExplainMedicalHistory(id, userId, medicalHistoryEntryId);

        if (result.IsSuccess)
        {
            return Ok(new { text = result.Data?.Text });
        }

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpGet("{patientId}/checkup-summary")]
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
        var result = await _aiService.GenerateCheckupSummary(patientId, userId, request);

        if (result.IsSuccess)
        {
            return Ok(result.Data);
        }

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}