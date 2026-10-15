namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // Bound from the "Emergency" section in appsettings.json.
    // Emergency:AllowedOrigins is read directly in Program.cs for the CORS policy.
    public class EmergencyOptions
    {
        public string PortalBaseUrl { get; set; } = "http://localhost:5173";
        public int EmergencySessionMinutes { get; set; } = 30;
        public int TreatmentSessionMinutes { get; set; } = 120;
        public int OneTimeLinkHours { get; set; } = 24;
        public int ApprovalWindowMinutes { get; set; } = 5;
        public int MaxFailedAttempts { get; set; } = 5;
        public int LockMinutes { get; set; } = 15;
    }
}
