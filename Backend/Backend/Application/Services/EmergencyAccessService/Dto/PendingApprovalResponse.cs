namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // A doctor entered the treatment code and waits for the patient
    public class PendingApprovalResponse
    {
        public int SessionId { get; set; }
        public DateTime RequestedAt { get; set; }
        public DateTime? ApprovalExpiresAt { get; set; }
        public string? AccessorName { get; set; }
        public string? AccessorInstitution { get; set; }
        public string? DeviceType { get; set; }
        public int SessionMinutes { get; set; }
    }
}
