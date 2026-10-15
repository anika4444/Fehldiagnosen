using Backend.Domain.Enums;
using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities
{
    // Short lived read session that replaces the QR token or PIN after the exchange
    public class EmergencyAccessSession : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public int CodeId { get; set; }

        [ForeignKey("CodeId")]
        public EmergencyAccessCode? Code { get; set; }

        // Copied from the code so the session keeps its scope even if the code changes
        [Required]
        public EmergencyCodeType CodeType { get; set; }

        // SHA-256 of the session token as hex
        [Required, MaxLength(64)]
        public string SessionTokenHash { get; set; } = string.Empty;

        public EmergencyApprovalState ApprovalState { get; set; } = EmergencyApprovalState.NotRequired;

        // Until when the patient can still answer a pending request
        public DateTime? ApprovalExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Hard end of the session, never extended
        public DateTime ExpiresAt { get; set; }

        public DateTime? RevokedAt { get; set; }

        public int? AccessLogId { get; set; }

        [ForeignKey("AccessLogId")]
        public EmergencyAccessLog? AccessLog { get; set; }
    }
}
