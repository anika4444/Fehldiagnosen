namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    public class EmergencyAccessLogResponse
    {
        public int Id { get; set; }
        public string CodeType { get; set; } = string.Empty;
        public string Method { get; set; } = string.Empty;
        // Granted, PendingApproval, Denied, WrongPin, Locked, or Expired when an approval was never answered
        public string Outcome { get; set; } = string.Empty;
        public DateTime AccessedAt { get; set; }
        public string? IpAddress { get; set; }
        public string? DeviceType { get; set; }
        public string? AccessorName { get; set; }
        public string? AccessorInstitution { get; set; }

        // Set while the session of this access is still open
        public int? RunningSessionId { get; set; }
        public DateTime? RunningUntil { get; set; }
    }
}
