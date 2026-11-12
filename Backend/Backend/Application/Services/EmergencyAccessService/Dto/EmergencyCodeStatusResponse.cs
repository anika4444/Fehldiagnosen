namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // State of one code without any secret
    public class EmergencyCodeStatusResponse
    {
        public string Type { get; set; } = string.Empty;
        public string PublicId { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public bool IsLocked { get; set; }
        public DateTime? LockedUntil { get; set; }
    }
}
