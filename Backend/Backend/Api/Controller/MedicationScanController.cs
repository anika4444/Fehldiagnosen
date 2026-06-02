using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/medications")]
public class MedicationScanController : BaseApiController
{
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

        return Ok(new
        {
            fileName = image.FileName,
            size = image.Length,
            mimeType = image.ContentType,
            base64Preview = base64[..Math.Min(100, base64.Length)] + "..."
        });
    }
}