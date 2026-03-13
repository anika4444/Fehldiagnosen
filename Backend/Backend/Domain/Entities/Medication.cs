using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities
{
    public class Medication : IEntity
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public required string Name { get; set; }
        
    }
}
