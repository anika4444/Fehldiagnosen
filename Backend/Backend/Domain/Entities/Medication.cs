using Backend.Domain.Enums;
using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    public class Medication : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }

        [Required]
        [MaxLength(150)]
        public required string Name { get; set; }

        [MaxLength(100)]
        public string? Dosage { get; set; }

        [MaxLength(100)]
        public string? IntakeFrequency { get; set; }

        [Required]
        public DateOnly? IntakeStartDate { get; set; }

        [Range(0, 3650)]
        public int DurationInDays { get; set; }

        public DateOnly? EndDate => IntakeStartDate?.AddDays(DurationInDays);

        [MaxLength(200)]
        public string? Indication { get; set; }

        public EntryBy? EntryBy { get; set; }
    }
}