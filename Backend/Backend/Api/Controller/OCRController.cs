using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PDFtoImage;
using SkiaSharp;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage.Streams;

namespace Backend.Api.Controller
{
    [ApiController]
    [Route("api/ocr")]
    public class OcrController : BaseApiController
    {
        [HttpPost("scan")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<string> Scan([FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            using var memStream = new MemoryStream();
            await stream.CopyToAsync(memStream);

            using var randomAccessStream = new InMemoryRandomAccessStream();
            await randomAccessStream.WriteAsync(memStream.ToArray().AsBuffer());
            randomAccessStream.Seek(0);

            var decoder = await BitmapDecoder.CreateAsync(randomAccessStream);
            var softwareBitmap = await decoder.GetSoftwareBitmapAsync();

            var engine = OcrEngine.TryCreateFromLanguage(new Windows.Globalization.Language("de-DE"));
            var result = await engine.RecognizeAsync(softwareBitmap);

            return result.Text;
        }
    }
}