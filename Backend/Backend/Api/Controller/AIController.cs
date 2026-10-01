using Backend.Application.Services.AIService;
using System.Text.Json;
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

    [HttpGet("{id}/explain-diagnosis/{diagnosisId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ExplainDiagnosis(
        [FromRoute] int id,
        [FromRoute] int diagnosisId)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();

        var result = await _aiService.ExplainDiagnosis(id, userId, diagnosisId);

        if (result.IsSuccess)
        {
            return Ok(new { text = result.Data?.Text, disclaimer = result.Data?.Disclaimer });
        }
        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("interpret-medical-letter")]
    public async Task<IActionResult> InterpretMedicalLetter([FromBody] InterpretMedicalLetterRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.LetterText))
            return BadRequest(new { error = "letterText is required" });

        if (request.PatientId == null)
            return BadRequest(new { error = "patientId is required" });

        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _aiService.InterpretMedicalLetter(request.PatientId, userId, request.LetterText);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}

public sealed class InterpretMedicalLetterRequest
{
    public int? PatientId { get; set; }
    public string? LetterText { get; set; }
}
