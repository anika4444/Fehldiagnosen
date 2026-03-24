using Backend.Domain.Enums;
using Backend.Domain.Interfaces;
using Microsoft.VisualBasic;

namespace Backend.Domain.Entities
{
    public class Medication : IEntity
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public required string Name { get; set; }
        public string? Dosage { get; set; }
        public string? IntakeFrequency { get; set; }
        public DateOnly IntakeStartDate { get; set; }
        public int DurationInDays { get; set; }

        public DateOnly? EndDate =>
            IntakeStartDate.AddDays(DurationInDays);
        public string? Indication { get; set; }
        public EntryBy? EntryBy { get; set; }
    }
}
