using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.AIService
{
    // Wird beim Start validiert (ValidateOnStart in Program.cs): Fehlt ein Schlüssel
    // oder ist er falsch benannt, startet das Backend nicht und nennt das Feld
    public sealed class AiServiceOptions
    {
        public const string SectionName = "AiServiceOptions";

        [Required, Url]
        public string ExplanationEndpoint { get; set; } = string.Empty;

        [Required, Url]
        public string InterpretEndpoint { get; set; } = string.Empty;

        [Required, Url]
        public string MedicationScanEndpoint { get; set; } = string.Empty;

        [Required, Url]
        public string CheckupSummaryEndpoint { get; set; } = string.Empty;
    }
}
