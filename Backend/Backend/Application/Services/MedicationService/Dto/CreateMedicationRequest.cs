using Backend.Domain.Entities;
using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Application.Services.MedicationService.Dto
{
    public class CreateMedicationRequest
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
        public int DurationInDays { get; set; } //automatic default from int is 0     

        [MaxLength(200)]
        public string? Indication { get; set; }

        public EntryBy? EntryBy { get; set; }

        public string? Notes { get; set; }
    }
}