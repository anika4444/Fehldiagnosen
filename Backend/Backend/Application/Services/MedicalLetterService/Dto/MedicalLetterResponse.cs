namespace Backend.Application.Services.MedicalLetterService.Dto
{
    public class MedicalLetterResponse
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string? AiSuggestion { get; set; }
        public string? ReworkedText { get; set; }
        public DateTime Startdate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string ReciverName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
