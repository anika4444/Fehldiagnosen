namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // Only returned once right after generating. The server cannot show these values again.
    public class GeneratedEmergencyCodeResponse
    {
        public string Type { get; set; } = string.Empty;
        public string PublicId { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string? Pin { get; set; }
        public string AccessUrl { get; set; } = string.Empty;
        public string PortalUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
    }
}
