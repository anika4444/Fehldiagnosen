using Backend.Application.Common.Results;
using Backend.Application.Services;
using Backend.Application.Services.AIService;
using Backend.Application.Services.MedicationService;
using Backend.Infrastructure.Observability;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/medications")]
public class MedicationController : BaseApiController
{
    private readonly IMedicationService _medicationService;
    private readonly IKnownMedicationService _knownMedicationService;
    private readonly IAIService _aiService;
    private readonly ILogger<MedicationController> _logger;

    public MedicationController(IMedicationService medicationService, IKnownMedicationService knownMedicationService, IAIService aiService, ILogger<MedicationController> logger)
    {
        _logger = logger;
        _medicationService = medicationService;
        _knownMedicationService = knownMedicationService;
        _aiService = aiService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetById(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.GetByIdAsync(id, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.DeleteAsync(id, userId);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [AllowAnonymous]
    [HttpPost("scan")]
    [Consumes("multipart/form-data")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> ScanMedication([FromForm] IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Kein Bild übermittelt.");

        using var ms = new MemoryStream();
        await image.CopyToAsync(ms);
        var base64 = Convert.ToBase64String(ms.ToArray());

        var result = await _aiService.InterpretMedicationImage(base64, image.ContentType);

        if (!result.IsSuccess)
        {
            AppMetrics.MedicationScans.WithLabels("ai_error").Inc();
            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        var data = result.Data;

        var medication = await _knownMedicationService.IdentifyAsync(
            brand: data?.Brand,
            productName: data?.ProductName,
            activeIngredient: data?.ActiveIngredient,
            dosage: data?.Dosage,
            form: data?.Form
        );

        AppMetrics.MedicationScans.WithLabels(medication != null ? "match" : "no_match").Inc();
        _logger.LogInformation("Medikamenten-Scan abgeschlossen ({ContentType}, {SizeKb} KB), Treffer in Datenbank: {Matched}",
            image.ContentType, image.Length / 1024, medication != null);

        return Ok(new
        {
            name = medication?.Name,
            dosage = medication?.Dosage,
        });
    }
}