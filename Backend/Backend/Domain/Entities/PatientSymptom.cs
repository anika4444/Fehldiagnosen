using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    public class PatientSymptom : IEntity
    {
        public int Id { get; set; }
        [Required]
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }
        [MaxLength(150)]
        public string? SymptomName { get; set; }
        public int? SymptomDefinitionId { get; set; }
        [ForeignKey("SymptomDefinitionId")]
        public SymptomDefinition? SymptomDefinition { get; set; }
        [Required]
        public DateTime OccurrenceTime { get; set; } = DateTime.UtcNow;
        [Range(1, 10)]
        public int Intensity { get; set; }
        [MaxLength(100)]
        public string? Duration { get; set; }
        [MaxLength(200)]
        public string? PossibleTrigger { get; set; }
        [MaxLength(1000)]
        public string? Notes { get; set; }
        public Dictionary<string, string?> Details { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
