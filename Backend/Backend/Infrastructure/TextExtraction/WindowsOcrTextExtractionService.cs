using System.Runtime.InteropServices.WindowsRuntime;
using Backend.Application.Common.Results;
using Backend.Application.Services.TextExtractionService;
using PDFtoImage;
using SkiaSharp;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage.Streams;

namespace Backend.Infrastructure.TextExtraction
{
    // Texterkennung mit der Windows-OCR (de-DE). PDFs werden Seite für Seite als Bild gerendert.
    public class WindowsOcrTextExtractionService : ITextExtractionService
    {
        // Obergrenzen gegen übermäßigen Speicher- und Zeitbedarf
        public const int MaxPdfPages = 20;
        // Längste Bildseite in Pixeln; A4 mit 300 DPI (2480 x 3508) passt ungekürzt.
        // Ein Bild mit 4000 x 4000 Pixeln belegt etwa 64 MB, die Windows-OCR erlaubt bis 10000.
        public const int MaxImageSide = 4000;

        private const int PdfRenderDpi = 300;
        private const float PointsPerInch = 72f;

        private readonly ILogger<WindowsOcrTextExtractionService> _logger;

        public WindowsOcrTextExtractionService(ILogger<WindowsOcrTextExtractionService> logger)
        {
            _logger = logger;
        }

        public async Task<ServiceResult<string>> ExtractTextAsync(byte[] content, DocumentFormat format)
        {
            var engine = OcrEngine.TryCreateFromLanguage(new Windows.Globalization.Language("de-DE"));
            if (engine == null)
            {
                return ServiceResult<string>.InternalServerError("Deutsches OCR-Sprachpaket nicht installiert.");
            }

            var pageTexts = new List<string>();
            try
            {
                if (format == DocumentFormat.Pdf)
                {
                    var pageCount = Conversion.GetPageCount(content);
                    if (pageCount > MaxPdfPages)
                    {
                        return ServiceResult<string>.Invalid($"Das PDF hat {pageCount} Seiten, erlaubt sind höchstens {MaxPdfPages}.");
                    }

                    // Seite für Seite, damit immer nur ein gerendertes Bild im Speicher liegt
                    for (var page = 0; page < pageCount; page++)
                    {
                        pageTexts.Add(await RecognizeAsync(engine, RenderPdfPage(content, page)));
                    }
                }
                else
                {
                    pageTexts.Add(await RecognizeAsync(engine, content));
                }
            }
            catch (Exception ex)
            {
                // Nur der Typ: Ausnahmetexte sollen keine Dokumentinhalte in die Logs bringen
                _logger.LogWarning("Texterkennung fehlgeschlagen: {ExceptionType}", ex.GetType().Name);
                return ServiceResult<string>.Invalid("Die Datei konnte nicht gelesen werden.");
            }

            var text = string.Join("\n\n", pageTexts.Where(pageText => !string.IsNullOrWhiteSpace(pageText)));

            if (string.IsNullOrWhiteSpace(text))
            {
                return ServiceResult<string>.Invalid("Es konnte kein Text extrahiert werden.");
            }

            return ServiceResult<string>.Success(text);
        }

        private static byte[] RenderPdfPage(byte[] pdf, int page)
        {
            // DPI so wählen, dass die längste Seite MaxImageSide nicht überschreitet (Seitengröße in Punkt, 1/72 Zoll)
            var size = Conversion.GetPageSize(pdf, page);
            var longestSideInPoints = Math.Max(size.Width, size.Height);
            var dpi = longestSideInPoints > 0
                ? (int)Math.Clamp(MaxImageSide * PointsPerInch / longestSideInPoints, 1, PdfRenderDpi)
                : PdfRenderDpi;

            using SKBitmap bitmap = Conversion.ToImage(pdf, page, options: new RenderOptions { Dpi = dpi });
            using var imageStream = new MemoryStream();
            bitmap.Encode(imageStream, SKEncodedImageFormat.Png, 100);
            return imageStream.ToArray();
        }

        private static async Task<string> RecognizeAsync(OcrEngine engine, byte[] imageBytes)
        {
            using var randomAccessStream = new InMemoryRandomAccessStream();
            await randomAccessStream.WriteAsync(imageBytes.AsBuffer());
            randomAccessStream.Seek(0);

            var decoder = await BitmapDecoder.CreateAsync(randomAccessStream);

            // Große Bilder schon beim Dekodieren verkleinern, statt sie in voller Größe zu laden
            var transform = new BitmapTransform();
            var longestSide = Math.Max(decoder.PixelWidth, decoder.PixelHeight);
            if (longestSide > MaxImageSide)
            {
                var scale = (double)MaxImageSide / longestSide;
                transform.ScaledWidth = (uint)Math.Max(1, Math.Round(decoder.PixelWidth * scale));
                transform.ScaledHeight = (uint)Math.Max(1, Math.Round(decoder.PixelHeight * scale));
                transform.InterpolationMode = BitmapInterpolationMode.Fant;
            }

            using var softwareBitmap = await decoder.GetSoftwareBitmapAsync(
                BitmapPixelFormat.Bgra8,
                BitmapAlphaMode.Premultiplied,
                transform,
                // Handyfotos liegen oft gedreht vor; die OCR braucht aufrechten Text
                ExifOrientationMode.RespectExifOrientation,
                ColorManagementMode.DoNotColorManage);

            var ocrResult = await engine.RecognizeAsync(softwareBitmap);
            return ocrResult.Text;
        }
    }
}
