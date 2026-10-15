namespace Backend.Application.Services.EmergencyDataService.Dto
{
    // A chronic or active condition, from a diagnosis or from the medical history
    public class EmergencyConditionDto
    {
        public string Title { get; set; } = string.Empty;
        public string? IcdCode { get; set; }
        public string Status { get; set; } = string.Empty;
        public int? Year { get; set; }
    }
}
