using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    public class DrugDetail:IEntity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string DrugBankId { get; set; }

        public string? Toxicity { get; set; }

        public string? Pharmacodynamics { get; set; }
        public string? SnpAdverseReactions { get; set; }
    }
}
