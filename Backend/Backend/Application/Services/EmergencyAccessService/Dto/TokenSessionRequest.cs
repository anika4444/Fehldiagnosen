namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // Sent by the portal after scanning the QR code.
    // Nullable so a missing token reaches the service and gets the usual error message.
    public class TokenSessionRequest
    {
        public string? Token { get; set; }
        public bool Consent { get; set; }
        public string? AccessorName { get; set; }
        public string? AccessorInstitution { get; set; }
    }
}
