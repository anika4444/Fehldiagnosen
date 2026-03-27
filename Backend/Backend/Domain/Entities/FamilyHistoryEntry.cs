using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    public class FamilyHistoryEntry : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }

        [Required]
        [MaxLength(100)]
        public string Relative { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Diagnosis { get; set; } = string.Empty;

        [MaxLength(1000)]
        public string? Comment { get; set; }
    }
}
}