using System.ComponentModel.DataAnnotations;
using Backend.Domain.Enums;

namespace Backend.Application.Services.DiagnosisService.Dto;

public class CreateDiagnosisRequest
{
    [Required]
    public int PatientId { get; set; }

    [Required]
    [MaxLength(200)]
    public required string Title { get; set; }

    public string? Description { get; set; }

    [MaxLength(20)]
    public string? IcdCode { get; set; }

    public string? Severity { get; set; }

    public string? SideLocalization { get; set; }

    [Required]
    public ConditionStatus ConditionStatus { get; set; }

    [Required]
    public EntryBy EntryBy { get; set; }

    public string? MedicationText { get; set; }

    public string? Symptoms { get; set; }

    public string? Findings { get; set; }

    public string? TherapeuticMeasures { get; set; }

    public string? Note { get; set; }

    public DateTime? DiagnosisDate { get; set; }
}
