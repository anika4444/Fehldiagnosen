using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Services.DiagnosisService.Dto;

public class UpdateDiagnosisRequest
{
    [MaxLength(200)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [MaxLength(20)]
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
}