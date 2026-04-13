using Backend.Application.Services.AIService;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/ai")]
public class AIController : ControllerBase
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

    [HttpPost("{id}/explain-medical-history/{medicalHistoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ExplainMedicalHistory(
        [FromRoute] int id,
        [FromRoute] int medicalHistoryId,
        [FromBody] ExplainMedicalHistoryRequest? request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();

        var result = await _aiService.ExplainMedicalHistory(id, userId, medicalHistoryId);

        if (result.IsSuccess)
        {
            return Ok(new { text = result.Data });
        }

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}
