using Backend.Domain.Interfaces;
using Backend.Domain.Enums;

namespace Backend.Domain.Entities
{
    public class MedicalHistoryEntry : IEntity
    {
        public int Id { get; set; }

        public string? ICD10Code { get; set; } = string.Empty;

        public string Diagnosis { get; set; } = string.Empty;

        public int Year { get; set; }

        public ConditionStatus Status { get; set; }

        public string? Comment { get; set; } = string.Empty;

        public EntryBy EntryBy { get; set; }
    }
}