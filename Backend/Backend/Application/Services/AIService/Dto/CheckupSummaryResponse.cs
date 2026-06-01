namespace Backend.Application.Services.AIService.Dto
{
    public class CheckupSummaryResponse
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public List<CheckupDiagnosis> Diagnoses { get; set; } = new();
        public List<CheckupMedication> Medications { get; set; } = new();
        public List<CheckupSymptom> Symptoms { get; set; } = new();
        public string? AiSummary { get; set; }
    }

    public class CheckupDiagnosis
    {
        public int Id { get; set; }
        public string? ICD10Code { get; set; }
        public string Diagnosis { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Comment { get; set; }
    }

    public class CheckupMedication
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Dosage { get; set; }
        public string? IntakeFrequency { get; set; }
        public DateTime? IntakeStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Indication { get; set; }
        public string? AtcCode { get; set; }
    }

    public class CheckupSymptom
    {
        public int Id { get; set; }
        public string? SymptomName { get; set; }
        public DateTime OccurrenceTime { get; set; }
        public int Intensity { get; set; }
        public string? Duration { get; set; }
        public string? PossibleTrigger { get; set; }
        public string? Notes { get; set; }
    }
}