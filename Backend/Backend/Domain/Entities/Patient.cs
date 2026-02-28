using Backend.Domain.Interfaces;
using Backend.Domain.Enums;

namespace Backend.Domain.Entities
{
    public class Patient : IEntity
    {
        public int Id { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }
        
        public Gender? Gender { get; set; }
    }
}
