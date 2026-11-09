namespace Backend.Application.Services.EmergencyDataService.Dto
{
    public class EmergencyMedicationDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Dosage { get; set; }
        public string? IntakeFrequency { get; set; }
        public string? Indication { get; set; }
        public string? AtcCode { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsCurrent { get; set; }
    }
}
