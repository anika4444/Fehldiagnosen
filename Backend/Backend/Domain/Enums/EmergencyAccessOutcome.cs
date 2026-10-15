namespace Backend.Domain.Enums
{
    // Result of an access attempt, stored in the access log
    public enum EmergencyAccessOutcome
    {
        Granted,
        PendingApproval,
        Denied,
        WrongPin,
        Locked
    }
}
