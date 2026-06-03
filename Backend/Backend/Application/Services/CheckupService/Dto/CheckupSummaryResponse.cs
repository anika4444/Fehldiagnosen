namespace Backend.Application.Services.CheckupService.Dto
{
    public sealed class CheckupSummaryResponse
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public List<CheckupDiagnosis> Diagnoses { get; set; } = [];
        public List<CheckupMedication> Medications { get; set; } = [];
        public List<CheckupSymptom> Symptoms { get; set; } = [];
        public string? AiSummary { get; set; }
    }

    public sealed class CheckupDiagnosis
    {
        public int Id { get; set; }
        public string? ICD10Code { get; set; }
        public string? Diagnosis { get; set; }
        public int Year { get; set; }
        public string? Status { get; set; }
        public string? Comment { get; set; }
    }

    public sealed class CheckupMedication
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Dosage { get; set; }
        public string? IntakeFrequency { get; set; }
        public DateTime? IntakeStartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Indication { get; set; }
        public string? AtcCode { get; set; }
    }

    public sealed class CheckupSymptom
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