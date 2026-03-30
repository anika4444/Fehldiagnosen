using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.MedicationService.Dto
{
    public class MedicationResponse
    {
        public int Id { get; set; }
        public  string Name { get; set; }
        public int PatientId { get; set; }
        public string? Dosage { get; set; }
        public string? IntakeFrequency { get; set; }
        public DateTime? IntakeStartDate { get; set; }
        public int? DurationInDays { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Indication { get; set; }
        public EntryBy? EntryBy { get; set; }
        public string? Notes { get; set; }
    }
}