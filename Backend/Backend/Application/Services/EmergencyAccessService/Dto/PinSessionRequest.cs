namespace Backend.Application.Services.EmergencyAccessService.Dto
{
    // Sent by the portal after entering emergency id and PIN.
    // Nullable so missing values reach the service and get the usual error message.
    public class PinSessionRequest
    {
        public string? PublicId { get; set; }
        public string? Pin { get; set; }
        public bool Consent { get; set; }
        public string? AccessorName { get; set; }
        public string? AccessorInstitution { get; set; }
    }
}
