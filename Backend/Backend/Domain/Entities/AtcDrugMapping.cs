using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities
{
    public class AtcDrugMapping:IEntity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(10)]
        public string AtcCode { get; set; }

        [Required]
        [StringLength(20)]
        public string DrugBankId { get; set; }

        [StringLength(200)]
        public string DrugName { get; set; }

    }
}
