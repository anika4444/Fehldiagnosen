namespace Backend.Application.Services.EmergencyDataService.Dto
{
    public class EmergencySymptomDto
    {
        public string Name { get; set; } = string.Empty;
        public int Intensity { get; set; }
        public DateTime OccurredAt { get; set; }
        public string? Duration { get; set; }
        public string? PossibleTrigger { get; set; }
        public string? Notes { get; set; }
    }
}
