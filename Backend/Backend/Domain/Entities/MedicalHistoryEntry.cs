using Backend.Domain.Interfaces;
using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    public class MedicalHistoryEntry : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }

        [MaxLength(10)]
        public string? ICD10Code { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string Diagnosis { get; set; } = string.Empty;

        [Range(1900, int.MaxValue, ErrorMessage = "Bitte ein realistisches Jahr eingeben.")]
        public int Year { get; set; }

        [Required]
        public ConditionStatus Status { get; set; }

        [MaxLength(2000)]
        public string? Comment { get; set; } = string.Empty;

        [Required]
        public EntryBy EntryBy { get; set; }
    }
}