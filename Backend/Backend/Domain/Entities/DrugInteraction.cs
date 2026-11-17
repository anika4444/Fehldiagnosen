using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities
{
    public class DrugInteraction:IEntity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string SourceDrugBankId { get; set; }

        [Required]
        [StringLength(20)]
        public string TargetDrugBankId { get; set; }

        [StringLength(200)]
        public string TargetName { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
