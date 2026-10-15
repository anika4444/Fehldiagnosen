namespace Backend.Application.Services.EmergencyDataService.Dto
{
    // Content of a scanned doctor's letter. In ADAM a letter is stored as a diagnosis
    // with findings, therapy and the AI explanation, so that is the source here.
    public class EmergencyLetterDto
    {
        public string Subject { get; set; } = string.Empty;
        public string? IcdCode { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Text { get; set; }
        public string? Findings { get; set; }
        public string? TherapeuticMeasures { get; set; }
        public string? MedicationText { get; set; }
        public string? AiExplanation { get; set; }
    }
}
