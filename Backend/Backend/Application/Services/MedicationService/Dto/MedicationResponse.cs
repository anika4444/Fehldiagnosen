using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.MedicationService.Dto
{
    public class MedicationResponse
    {
        //ist eigentlich in diesem Fall genau das gleiche wie das ganze Objekt falls noch Erweiterungen dazu kommen ist ein Response dennoch sinvoll.
        public int Id { get; set; }
        public  string Name { get; set; }
        public int PatientId { get; set; }
        public string? Dosage { get; set; }
        public string? IntakeFrequency { get; set; }
        public DateOnly? IntakeStartDate { get; set; }
        public int? DurationInDays { get; set; }
        public DateOnly? EndDate { get; set; }
        public string? Indication { get; set; }
        public EntryBy? EntryBy { get; set; }
    }
}