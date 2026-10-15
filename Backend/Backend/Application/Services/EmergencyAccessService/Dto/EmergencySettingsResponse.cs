namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    public class EmergencySettingsResponse
    {
        public DateTime? ConsentGivenAt { get; set; }
        public bool TreatmentRequiresApproval { get; set; }
        public List<EmergencyCategorySetting> Categories { get; set; } = new();
    }
}
