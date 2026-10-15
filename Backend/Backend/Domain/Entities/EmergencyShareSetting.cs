using Backend.Domain.Enums;
using Backend.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities
{
    // Which data category a code type shows. Missing rows fall back to the defaults.
    public class EmergencyShareSetting : IEntity
    {
        public int Id { get; set; }

        [Required]
        public int PatientId { get; set; }

        [Required]
        public EmergencyCodeType CodeType { get; set; }

        [Required]
        public EmergencyDataCategory Category { get; set; }

        public bool IsEnabled { get; set; }
    }
}
