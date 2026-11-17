using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities
{
    public class SymptomField : IEntity
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        public bool IsRequired { get; set; }
        public List<string?> Options { get; set; }
    }
}
