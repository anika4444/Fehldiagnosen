using Backend.Domain.Interfaces;
using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

public class Diagnosis : IEntity
{
    public int Id { get; set; }

    [Required]
    public int PatientId { get; set; }

    [ForeignKey("PatientId")]
    public Patient? Patient { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(20)]
    public string IcdCode { get; set; } = string.Empty;

    [MaxLength(50)]
    public string Severity { get; set; } = string.Empty;

    [MaxLength(50)]
    public string SideLocalization { get; set; } = string.Empty;

    [Required]
    public ConditionStatus ConditionStatus { get; set; }

    [Required]
    public EntryBy EntryBy { get; set; }

    public string? AiExplanation { get; set; }

    [MaxLength(500)]
    public string MedicationText { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Symptoms { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string Findings { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string TherapeuticMeasures { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Note { get; set; }

    [Required]
    public DateTime DiagnosisDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}