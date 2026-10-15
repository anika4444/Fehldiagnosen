namespace Backend.Application.Services.EmergencyDataService.Dto
{
    // Everything the portal shows at once. No name, age, gender or photo on purpose.
    // A list is null when its category is not shared with the current code.
    public class EmergencyDataResponse
    {
        public string CodeType { get; set; } = string.Empty;
        public DateTime? SessionExpiresAt { get; set; }

        // Counted on the server, so a wrong clock on the helper's device does not matter
        public int? SessionSecondsRemaining { get; set; }

        public DateTime? LastUpdatedAt { get; set; }
        public List<string> SharedCategories { get; set; } = new();

        public List<EmergencyRedFlagDto>? RedFlags { get; set; }
        public List<EmergencyMedicationDto>? Medications { get; set; }
        public List<EmergencyConditionDto>? ChronicConditions { get; set; }
        public List<EmergencySymptomDto>? Symptoms { get; set; }

        public List<EmergencySymptomDto>? SymptomHistory { get; set; }
        public List<EmergencyLetterDto>? MedicalLetters { get; set; }
        public List<EmergencyMedicationDto>? MedicationHistory { get; set; }
    }
}
