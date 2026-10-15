namespace Backend.Domain.Enums
{
    // Data blocks the patient can share per code type
    public enum EmergencyDataCategory
    {
        // Core data, allowed for every code type
        Medications,
        Interactions,
        ChronicConditions,
        Symptoms,
        RedFlags,
        AiSummary,

        // Extended data, never shown with the emergency code
        SymptomHistory,
        MedicalLetters,
        MedicationHistory
    }
}
