using Backend.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Application.Services.SymptomService.Dto
{
    public class PatientSymptomResponse
    {
        public int Id { get; set; }
        
        public int PatientId { get; set; }
        
        public string? SymptomName { get; set; }
        
        public int? SymptomId { get; set; }
        
        public string? DefinedSymptomName { get; set; }
        
        public DateTime OccurrenceTime { get; set; }
        
        public int Intensity { get; set; }
        
        public string? Duration { get; set; }
        
        public string? PossibleTrigger { get; set; }
        
        public string? Notes { get; set; }
        
        public Dictionary<string, string?> Details { get; set; } = new();
        
        public DateTime CreatedAt { get; set; }
    }
}
