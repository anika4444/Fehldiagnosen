using Backend.Domain.Interfaces;
using Backend.Domain.Enums;

namespace Backend.Domain.Entities
{
    public class Patient : IEntity
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;
        public ApplicationUser ApplicationUser;

        public string UserName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public DateTime DateOfBirth { get; set; }
        
        public Gender? Gender { get; set; }

        public List<PatientSymptom> SymptomEntries { get; set; } = new();
        
        public List<Medication> MedicationEntries { get; set; } = new();

        public List<MedicalHistoryEntry> MedicalHistoryEntries { get; set; } = new();
    }
}
