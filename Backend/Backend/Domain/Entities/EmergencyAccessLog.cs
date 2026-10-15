using Backend.Domain.Enums;
using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities
{
    // Every access attempt on the portal, visible to the patient in the app
    public class EmergencyAccessLog : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public EmergencyCodeType CodeType { get; set; }

        [Required]
        public EmergencyAccessMethod Method { get; set; }

        [Required]
        public EmergencyAccessOutcome Outcome { get; set; }

        public DateTime AccessedAt { get; set; } = DateTime.UtcNow;

        [MaxLength(45)]
        public string? IpAddress { get; set; }

        [MaxLength(100)]
        public string? DeviceType { get; set; }

        // Voluntary and unverified, only for the protocol
        [MaxLength(100)]
        public string? AccessorName { get; set; }

        [MaxLength(150)]
        public string? AccessorInstitution { get; set; }
    }
}
