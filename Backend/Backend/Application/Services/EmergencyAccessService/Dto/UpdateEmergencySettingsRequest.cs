namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    public class UpdateEmergencySettingsRequest
    {
        public bool TreatmentRequiresApproval { get; set; }
        public List<EmergencyCategorySetting> Categories { get; set; } = new();
    }
}
