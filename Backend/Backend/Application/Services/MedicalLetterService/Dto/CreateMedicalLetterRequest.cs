using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.MedicalLetterService.Dto
{
    public class CreateMedicalLetterRequest
    {
        [Required]
        public int PatientId { get; set; }

        [Required, MaxLength(200)]
        public string Subject { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string ReciverName { get; set; } = string.Empty;
    }
}
