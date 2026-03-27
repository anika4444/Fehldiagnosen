using Backend.Domain.Entities;
using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Application.Services.MedicationService.Dto
{
    public class CreateMedicationRequest
    {
        public int Id { get; set; }

        [MaxLength(150)]
        public required string Name { get; set; }
        //

        [Required]
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }

        [MaxLength(100)]
        public string? Dosage { get; set; }

        [MaxLength(100)]
        public string? IntakeFrequency { get; set; }

     
        public DateOnly? IntakeStartDate { get; set; }

        [Range(0, 3650)]
        public int DurationInDays { get; set; } //automatic default from int is 0

        public DateOnly? EndDate => IntakeStartDate?.AddDays(DurationInDays);

        [MaxLength(200)]
        public string? Indication { get; set; }

        public EntryBy? EntryBy { get; set; }
    }
}