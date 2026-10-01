using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    public enum Status
    {
        Validation,
        Confirmed
    }

    public class MedicalLetter : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }

        [MaxLength(5000)]
        public string? AiSuggestion { get; set; }

        [MaxLength(5000)]
        public string? ReworkedText { get; set; }

        public DateTime Startdate { get; set; } = DateTime.UtcNow;

        [Required]
        public Status Status { get; set; }

        [Required, MaxLength(200)]
        public string Subject { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string ReciverName { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}