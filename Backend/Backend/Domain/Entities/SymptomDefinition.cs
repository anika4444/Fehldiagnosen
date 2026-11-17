using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Domain.Entities
{
    public class SymptomDefinition : IEntity
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;
        public List<String> Aliases { get; set; } = new();
        public List<SymptomField> Fields { get; set; } = new();

        [JsonIgnore]
        public List<PatientSymptom> SymptomEntries { get; set; } = new();
    }
}
