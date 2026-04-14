using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    public class CommunicationLevel : IEntity
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(10)]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public string KiPrompt { get; set; } = string.Empty;

        public string ActionRecommendation { get; set; } = string.Empty;

    }
}
