using Backend.Application.Common.Results;
using Backend.Application.Services.AnonymizerService;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.DiagnosisService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDFtoImage;
using SkiaSharp;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text.Json;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage.Streams;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/diagnoses")]
public class DiagnosisController : BaseApiController
{
    private readonly IDiagnosisService _diagnosisService;
    private readonly IAnonymizerService _anonymizerService;


    public DiagnosisController(IDiagnosisService diagnosisService, IAnonymizerService anonymizer)
    {
        _diagnosisService = diagnosisService;
        _anonymizerService = anonymizer;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetById(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _diagnosisService.GetByIdAsync(id, userId);

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
        var result = await _diagnosisService.DeleteAsync(id, userId);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("scan")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Scan([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Keine Datei hochgeladen.");
        }

        try
        {
            InMemoryRandomAccessStream randomAccessStream = new InMemoryRandomAccessStream();
            byte[] imageBytes;
            string extension = Path.GetExtension(file.FileName).ToLower();

            if (extension == ".pdf")
            {
                using var pdfStream = file.OpenReadStream();
                using var memStream = new MemoryStream();
                await pdfStream.CopyToAsync(memStream);

                string pdfAsBase64 = Convert.ToBase64String(memStream.ToArray());

                var options = new RenderOptions { Dpi = 300 };
                using SKBitmap bitmap = Conversion.ToImage(pdfAsBase64, options: options);

                using var imageStream = new MemoryStream();
                bitmap.Encode(imageStream, SKEncodedImageFormat.Png, 100);

                await randomAccessStream.WriteAsync(imageStream.ToArray().AsBuffer());
            }
            else
            {
                using var stream = file.OpenReadStream();
                using var memStream = new MemoryStream();
                await stream.CopyToAsync(memStream);

                await randomAccessStream.WriteAsync(memStream.ToArray().AsBuffer());
            }

            randomAccessStream.Seek(0);

            var decoder = await BitmapDecoder.CreateAsync(randomAccessStream);
            var softwareBitmap = await decoder.GetSoftwareBitmapAsync();

            var engine = OcrEngine.TryCreateFromLanguage(new Windows.Globalization.Language("de-DE"));
            if (engine == null)
                return StatusCode(500, "Deutsches OCR-Sprachpaket nicht installiert.");

            var ocrResult = await engine.RecognizeAsync(softwareBitmap);
            var extractedText = ocrResult.Text;

            if (string.IsNullOrWhiteSpace(extractedText))
                return BadRequest("Es konnte kein Text extrahiert werden.");

            string pythonJsonResult = await _anonymizerService.AnonymizeTextAsync(extractedText);

            var pythonData = JsonSerializer.Deserialize<Dictionary<string, object>>(pythonJsonResult);

            return Ok(new
            {
                anonymizedText = pythonData?["anonymized_text"]?.ToString(),
                mapping = pythonData?["mapping"]
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Fehler bei der Verarbeitung: {ex.Message}");
        }
    }
}