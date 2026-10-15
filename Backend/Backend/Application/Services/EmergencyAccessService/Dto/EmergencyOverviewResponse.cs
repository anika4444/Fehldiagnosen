namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    public class EmergencyOverviewResponse
    {
        public DateTime? ConsentGivenAt { get; set; }
        public bool TreatmentRequiresApproval { get; set; }

        // The app builds the QR address from this and the token stored on the device,
        // so a changed portal address does not require new codes
        public string PortalBaseUrl { get; set; } = string.Empty;
        public int OneTimeLinkHours { get; set; }

        public List<EmergencyCodeStatusResponse> ActiveCodes { get; set; } = new();
        public int OpenSessionCount { get; set; }
        public int PendingApprovalCount { get; set; }
    }
}
