using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.SymptomService.Dto
{
    public class CreatePatientSymptomRequest
    {
        [MaxLength(150)]
        public string? SymptomName { get; set; }
        public int? SymptomId { get; set; }
        [Required]
        public DateTime OccurrenceTime { get; set; } = DateTime.Now;
        [Range(1, 10)]
        public int Intensity { get; set; }
        [MaxLength(100)]
        public string? Duration { get; set; }
        [MaxLength(200)]
        public string? PossibleTrigger { get; set; }
        [MaxLength(1000)]
        public string? Notes { get; set; }
        public Dictionary<string, string?> Details { get; set; } = new();
    }
}
