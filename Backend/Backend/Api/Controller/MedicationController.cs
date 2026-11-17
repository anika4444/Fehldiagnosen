using Backend.Application.Common.Results;
using Backend.Application.Services;
using Backend.Application.Services.AIService;
using Backend.Application.Services.MedicationService;
using Backend.Application.Services.TextExtractionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/medications")]
public class MedicationController : BaseApiController
{
    private const long MaxScanFileBytes = 10 * 1024 * 1024;
    private const long MaxScanRequestBytes = MaxScanFileBytes + 1024 * 1024;

    private readonly IMedicationService _medicationService;
    private readonly IKnownMedicationService _knownMedicationService;
    private readonly IMedicationScanService _medicationScanService;

    public MedicationController(IMedicationService medicationService, IKnownMedicationService knownMedicationService, IMedicationScanService medicationScanService)
    {
        _medicationService = medicationService;
        _knownMedicationService = knownMedicationService;
        _medicationScanService = medicationScanService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetById(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.GetByIdAsync(id, userId);

        return ToActionResult(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.DeleteAsync(id, userId);

        return ToActionResult(result);
    }

    [HttpPost("scan")]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(MaxScanRequestBytes)]
    [RequestFormLimits(MultipartBodyLengthLimit = MaxScanRequestBytes)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status413PayloadTooLarge)]
    [ProducesResponseType(StatusCodes.Status415UnsupportedMediaType)]
    public async Task<ActionResult> ScanMedication([FromForm] IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Kein Bild übermittelt.");

        if (image.Length > MaxScanFileBytes)
            return StatusCode(StatusCodes.Status413PayloadTooLarge, "Das Bild ist zu groß (maximal 10 MB).");

        using var ms = new MemoryStream();
        await image.CopyToAsync(ms);
        var content = ms.ToArray();

        var mimeType = DocumentFormatDetector.Detect(content) switch
        {
            DocumentFormat.Png => "image/png",
            DocumentFormat.Jpeg => "image/jpeg",
            _ => null
        };

        if (mimeType == null)
            return StatusCode(StatusCodes.Status415UnsupportedMediaType, "Nur PNG oder JPEG werden unterstützt.");

        var base64 = Convert.ToBase64String(content);

        var result = await _medicationScanService.InterpretMedicationImage(base64, mimeType);

        if (!result.IsSuccess)
            return HandleServiceError(result.ErrorType, result.ErrorMessage);

        var data = result.Data;

        var medication = await _knownMedicationService.IdentifyAsync(
            brand: data?.Brand,
            productName: data?.ProductName,
            activeIngredient: data?.ActiveIngredient,
            dosage: data?.Dosage,
            form: data?.Form
        );

        return Ok(new
        {
            name = medication?.Name,
            dosage = medication?.Dosage,
            atcCode = medication?.AtcCode,
        });
    }
}