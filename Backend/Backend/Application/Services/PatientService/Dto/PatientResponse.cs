using Backend.Domain.Enums;

namespace Backend.Application.Services.PatientService.Dto
{
    public class PatientResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public Gender? Gender { get; set; }
    }
}