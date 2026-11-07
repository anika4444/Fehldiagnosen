using Backend.Application.Services.AIService;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/ai")]
public class AIController : BaseApiController
{
    private readonly IDiagnosisExplanationService _diagnosisExplanationService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AIController> _logger;

    public AIController(
        IDiagnosisExplanationService diagnosisExplanationService,
        IConfiguration configuration,
        ILogger<AIController> logger)
    {
        _diagnosisExplanationService = diagnosisExplanationService;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet("{id}/explain-diagnosis/{diagnosisId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ExplainDiagnosis(
        [FromRoute] int id,
        [FromRoute] int diagnosisId)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();

        var result = await _diagnosisExplanationService.ExplainDiagnosis(id, userId, diagnosisId);

        if (result.IsSuccess)
        {
            return Ok(new { text = result.Data?.Text, disclaimer = result.Data?.Disclaimer });
        }
        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}
