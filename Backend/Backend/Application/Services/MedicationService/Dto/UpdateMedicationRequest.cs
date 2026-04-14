using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.MedicationService.Dto
{
    public class UpdateMedicationRequest
    {
        [MaxLength(150)]
        public required string Name { get; set; }

        [Required]
        public int PatientId { get; set; }

        [MaxLength(100)]
        public string? Dosage { get; set; }

        [MaxLength(100)]
        public string? IntakeFrequency { get; set; }
     
        public DateTime? IntakeStartDate { get; set; }

        [Range(0, 3650)]
        public int DurationInDays { get; set; }

        [MaxLength(200)]
        public string? Indication { get; set; }

        [MaxLength(20)]
        public string? AtcCode { get; set; }

        public EntryBy? EntryBy { get; set; }

        public string? Notes { get; set; }

        public string? Substance { get; set; }

        public bool? PrescriptionRequired { get; set; }
    }
}