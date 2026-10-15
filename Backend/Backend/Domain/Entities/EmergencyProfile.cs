using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities
{
    // Per patient settings of the emergency feature
    public class EmergencyProfile : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        // Opt in. Without consent no code can be generated.
        public DateTime? ConsentGivenAt { get; set; }

        // Treatment code only works after the patient confirms in the app
        public bool TreatmentRequiresApproval { get; set; }
    }
}
