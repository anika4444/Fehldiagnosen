namespace Backend.Domain.Entities
{
    public class Medication : IEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        
    }
}
