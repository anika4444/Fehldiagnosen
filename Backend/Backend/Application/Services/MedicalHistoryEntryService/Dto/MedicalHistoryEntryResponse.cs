using Backend.Domain.Entities;
using Backend.Domain.Enums;

namespace Backend.Application.Services.MedicalHistoryEntryService.Dto
{
    public class MedicalHistoryEntryResponse
    {
        public int Id { get; set; }

        public int PatientId { get; set; }

        public string? ICD10Code { get; set; } = string.Empty;

        public string Diagnosis { get; set; } = string.Empty;

        public int Year { get; set; }

        public ConditionStatus Status { get; set; }

        public string? Comment { get; set; } = string.Empty;

        public EntryBy EntryBy { get; set; }
    }
}
