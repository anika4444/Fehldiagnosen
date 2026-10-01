using Backend.Application.Common.Results;
using Backend.Application.Services;
using Backend.Application.Services.AIService;
using Backend.Application.Services.MedicationService;
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

    public MedicationController(IMedicationService medicationService, IKnownMedicationService knownMedicationService, IAIService aiService)
    {
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
            return HandleServiceError(result.ErrorType, result.ErrorMessage);

        var data = result.Data;

        Console.WriteLine($"[Scan] KI → brand={data?.Brand}, productName={data?.ProductName}, activeIngredient={data?.ActiveIngredient}, dosage={data?.Dosage}, form={data?.Form}");

        var medication = await _knownMedicationService.IdentifyAsync(
            brand: data?.Brand,
            productName: data?.ProductName,
            activeIngredient: data?.ActiveIngredient,
            dosage: data?.Dosage,
            form: data?.Form
        );

        Console.WriteLine($"[Scan] DB-Treffer → name={medication?.Name}, dosage={medication?.Dosage}");

        return Ok(new
        {
            name = medication?.Name,
            dosage = medication?.Dosage,
        });
    }
}