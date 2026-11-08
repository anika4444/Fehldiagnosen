using Backend.Application.Common.Results;

namespace Backend.Application.Services.TextExtractionService
{
    public enum DocumentFormat
    {
        Pdf,
        Png,
        Jpeg
    }

    public interface ITextExtractionService
    {
        // Liefert den erkannten Text; leerer Text ergibt einen ValidationError
        Task<ServiceResult<string>> ExtractTextAsync(byte[] content, DocumentFormat format);
    }

    public static class DocumentFormatDetector
    {
        // Prüft die Dateisignatur statt Endung oder Content-Type, die der Client frei setzen kann
        public static DocumentFormat? Detect(ReadOnlySpan<byte> content)
        {
            if (content.StartsWith("%PDF-"u8))
                return DocumentFormat.Pdf;

            if (content.StartsWith(new byte[] { 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A }))
                return DocumentFormat.Png;

            if (content.StartsWith(new byte[] { 0xFF, 0xD8, 0xFF }))
                return DocumentFormat.Jpeg;

            return null;
        }
    }
}
