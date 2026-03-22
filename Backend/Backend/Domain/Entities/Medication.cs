using Backend.Domain.Interfaces;
using Microsoft.VisualBasic;

namespace Backend.Domain.Entities
{
    public class Medication : IEntity
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public required string Name { get; set; }
        public string? dosage { get; set; }
        public string? intakeFrequency { get; set; }
        public DateOnly intakeStartDate { get; set; }
        public int DurationInDays { get; set; }

        public DateOnly EndDate =>
            intakeStartDate.AddDays(DurationInDays);
        public string? indication { get; set; }
        public string? issuedBy { get; set; }
    }
}
