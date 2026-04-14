using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.UserService.Dto
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "User Name is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string Role { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }

        public Gender? Gender { get; set; }

        public string? Specialization { get; set; }
        public string? LicenseNumber { get; set; }
    }
}
