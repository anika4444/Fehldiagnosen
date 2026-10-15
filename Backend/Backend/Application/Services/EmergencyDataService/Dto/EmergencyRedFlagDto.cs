namespace Backend.Application.Services.EmergencyDataService.Dto
{
    // Rule based warning, no AI involved
    public class EmergencyRedFlagDto
    {
        public string Title { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;

        // Medication, Symptom or Condition
        public string Source { get; set; } = string.Empty;
    }
}
