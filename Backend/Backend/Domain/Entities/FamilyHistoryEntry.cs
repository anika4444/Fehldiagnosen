using Backend.Domain.Interfaces;


namespace Backend.Domain.Entities
{
    public class FamilyHistoryEntry : IEntity //Familienanamnese
    {
        public int Id { get; set; }
        public int PatientId { get; set; } //foreign key to patient, so no need for an attribute like name
        public string Relative { get; set; } = string.Empty;

        public string Diagnosis { get; set; } = string.Empty;

        public string? Comment { get; set; } = string.Empty; //optional
    }
}
