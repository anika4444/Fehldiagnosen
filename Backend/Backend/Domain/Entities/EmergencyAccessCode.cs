using Backend.Domain.Enums;
using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    // One access code of a patient. Token and PIN are only stored as hashes.
    public class EmergencyAccessCode : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [ForeignKey("PatientId")]
        public Patient? Patient { get; set; }

        [Required]
        public EmergencyCodeType Type { get; set; }

        // Public part of the PIN login, 8 characters, shown next to the QR code
        [Required, MaxLength(8)]
        public string PublicId { get; set; } = string.Empty;

        // SHA-256 of the QR token as hex
        [Required, MaxLength(64)]
        public string TokenHash { get; set; } = string.Empty;

        // BCrypt hash of the 6 digit PIN, null for one time links
        [MaxLength(100)]
        public string? PinHash { get; set; }

        public bool IsActive { get; set; } = true;

        // Only used for one time links
        public DateTime? ExpiresAt { get; set; }

        public int FailedAttempts { get; set; }

        public DateTime? LockedUntil { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DeactivatedAt { get; set; }
    }
}
