namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    public class EmergencySessionResponse
    {
        // Only part of the answer when the session is created
        public string? SessionToken { get; set; }
        public string CodeType { get; set; } = string.Empty;
        public string ApprovalState { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public DateTime? ApprovalExpiresAt { get; set; }

        // Counted on the server, so a wrong clock on the helper's device does not matter
        public int SecondsRemaining { get; set; }
        public int? ApprovalSecondsRemaining { get; set; }
    }
}
