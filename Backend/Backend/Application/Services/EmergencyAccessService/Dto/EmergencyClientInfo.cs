namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // Request details the controller passes to the service for the access log
    public class EmergencyClientInfo
    {
        public string? IpAddress { get; set; }
        public string? UserAgent { get; set; }
    }
}
