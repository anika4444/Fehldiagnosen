namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // One row of the share matrix in the app
    public class EmergencyCategorySetting
    {
        public string Category { get; set; } = string.Empty;
        public bool Emergency { get; set; }
        public bool Treatment { get; set; }

        // Extended categories are never shared with the emergency code
        public bool IsExtended { get; set; }
    }
}
