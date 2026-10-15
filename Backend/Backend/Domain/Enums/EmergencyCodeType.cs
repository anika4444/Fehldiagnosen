namespace Backend.Domain.Enums
{
    // Kind of access code a patient can hand out
    public enum EmergencyCodeType
    {
        Emergency,  // rescue services, core data only
        Treatment,  // doctors, core data plus extended data
        OneTime     // single use treatment link with fixed lifetime
    }
}
