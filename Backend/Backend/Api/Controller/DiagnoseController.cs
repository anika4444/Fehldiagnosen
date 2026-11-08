using Backend.Application.Services.AIService;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.TextExtractionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/diagnoses")]
public class DiagnosisController : BaseApiController
{
    private const long MaxScanFileBytes = 10 * 1024 * 1024;
    // Puffer für Multipart-Header und Formularfelder neben der Datei
    private const long MaxScanRequestBytes = MaxScanFileBytes + 1024 * 1024;

    private readonly IDiagnosisService _diagnosisService;
    private readonly IMedicalLetterInterpretationService _medicalLetterInterpretationService;


    public DiagnosisController(IDiagnosisService diagnosisService, IMedicalLetterInterpretationService medicalLetterInterpretationService)
    {
        _diagnosisService = diagnosisService;
        _medicalLetterInterpretationService = medicalLetterInterpretationService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetById(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _diagnosisService.GetByIdAsync(id, userId);

        return ToActionResult(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _diagnosisService.DeleteAsync(id, userId);

        return ToActionResult(result);
    }

    [HttpPost("{patientId}/scan")]
    [RequestSizeLimit(MaxScanRequestBytes)]
    [RequestFormLimits(MultipartBodyLengthLimit = MaxScanRequestBytes)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status413PayloadTooLarge)]
    [ProducesResponseType(StatusCodes.Status415UnsupportedMediaType)]
    public async Task<IActionResult> Scan(int patientId, [FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Keine Datei hochgeladen.");
        }

        if (file.Length > MaxScanFileBytes)
        {
            return StatusCode(StatusCodes.Status413PayloadTooLarge, "Die Datei ist zu groß (maximal 10 MB).");
        }

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        var content = memoryStream.ToArray();

        var format = DocumentFormatDetector.Detect(content);
        if (format == null)
        {
            return StatusCode(StatusCodes.Status415UnsupportedMediaType, "Nur PDF, PNG oder JPEG werden unterstützt.");
        }

        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalLetterInterpretationService.ScanMedicalLetter(patientId, userId, GetEntryBy(), content, format.Value);

        return ToActionResult(result);
    }
}