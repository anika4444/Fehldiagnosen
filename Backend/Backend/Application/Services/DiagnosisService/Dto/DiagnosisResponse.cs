namespace Backend.Application.Services.DiagnosisService.Dto;

public class DiagnosisResponse
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? IcdCode { get; set; }
    public string? Severity { get; set; }
    public string? SideLocalization { get; set; }
    public string? Status { get; set; }
    public string? MedicationText { get; set; }
    public string? Symptoms { get; set; }
    public string? Findings { get; set; }
    public string? TherapeuticMeasures { get; set; }
    public string? Note { get; set; }
    public DateTime? DiagnosisDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}