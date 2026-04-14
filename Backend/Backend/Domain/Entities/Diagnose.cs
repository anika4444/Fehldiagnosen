using Backend.Domain.Interfaces;

namespace Backend.Domain.Entities;

public class Diagnosis : IEntity
{

    public int Id { get; set; }
    public int PatientId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string IcdCode { get; set; } = string.Empty;
    public string Severity { get; set; } = string.Empty;
    public string SideLocalization { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string MedicationText { get; set; } = string.Empty;
    public string Symptoms { get; set; } = string.Empty;
    public string Findings { get; set; } = string.Empty;
    public string TherapeuticMeasures { get; set; } = string.Empty;
    public string Note { get; set; }
    public DateTime DiagnosisDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

