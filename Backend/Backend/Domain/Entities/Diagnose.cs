using Backend.Domain.Interfaces;
using Backend.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

public class Diagnosis : IEntity
{
    public const string AiExplanationDisclaimer =
        "Dies ist eine KI-generierte Erklärung - kein Ersatz für ein persönliches Arztgespräch.";

    public int Id { get; set; }

    [Required]
    public int PatientId { get; private set; }

    [ForeignKey("PatientId")]
    public Patient? Patient { get; private set; }

    [Required, MaxLength(200)]
    public string Title { get; private set; } = string.Empty;

    [MaxLength(1000)]
    public string Description { get; private set; } = string.Empty;

    [MaxLength(20)]
    public string IcdCode { get; private set; } = string.Empty;

    [MaxLength(50)]
    public string Severity { get; private set; } = string.Empty;

    [MaxLength(50)]
    public string SideLocalization { get; private set; } = string.Empty;

    [Required]
    public ConditionStatus ConditionStatus { get; private set; }

    [Required]
    public EntryBy EntryBy { get; private set; }

    public string? AiExplanation { get; private set; }

    [MaxLength(500)]
    public string MedicationText { get; private set; } = string.Empty;

    [MaxLength(1000)]
    public string Symptoms { get; private set; } = string.Empty;

    [MaxLength(1000)]
    public string Findings { get; private set; } = string.Empty;

    [MaxLength(1000)]
    public string TherapeuticMeasures { get; private set; } = string.Empty;

    [MaxLength(500)]
    public string? Note { get; private set; }

    [Required]
    public DateTime DiagnosisDate { get; private set; }

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; private set; } = DateTime.UtcNow;

    private Diagnosis()
    {
    }

    public static Diagnosis Create(
        int patientId,
        string title,
        ConditionStatus conditionStatus,
        EntryBy entryBy,
        string? description = null,
        string? icdCode = null,
        string? severity = null,
        string? sideLocalization = null,
        string? medicationText = null,
        string? symptoms = null,
        string? findings = null,
        string? therapeuticMeasures = null,
        string? note = null,
        DateTime? diagnosisDate = null)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Eine Diagnose braucht einen Titel.", nameof(title));
        }

        var now = DateTime.UtcNow;

        return new Diagnosis
        {
            PatientId = patientId,
            Title = title,
            ConditionStatus = conditionStatus,
            EntryBy = entryBy,
            Description = description ?? string.Empty,
            IcdCode = icdCode ?? string.Empty,
            Severity = severity ?? string.Empty,
            SideLocalization = sideLocalization ?? string.Empty,
            MedicationText = medicationText ?? string.Empty,
            Symptoms = symptoms ?? string.Empty,
            Findings = findings ?? string.Empty,
            TherapeuticMeasures = therapeuticMeasures ?? string.Empty,
            Note = note ?? string.Empty,
            DiagnosisDate = diagnosisDate ?? now,
            CreatedAt = now,
            UpdatedAt = now
        };
    }

    public void Update(
        string? title = null,
        string? description = null,
        string? icdCode = null,
        string? severity = null,
        string? sideLocalization = null,
        ConditionStatus? conditionStatus = null,
        string? medicationText = null,
        string? symptoms = null,
        string? findings = null,
        string? therapeuticMeasures = null,
        string? note = null,
        DateTime? diagnosisDate = null)
    {
        Title = string.IsNullOrWhiteSpace(title) ? Title : title;
        Description = description ?? Description;
        IcdCode = icdCode ?? IcdCode;
        Severity = severity ?? Severity;
        SideLocalization = sideLocalization ?? SideLocalization;
        ConditionStatus = conditionStatus ?? ConditionStatus;
        MedicationText = medicationText ?? MedicationText;
        Symptoms = symptoms ?? Symptoms;
        Findings = findings ?? Findings;
        TherapeuticMeasures = therapeuticMeasures ?? TherapeuticMeasures;
        Note = note ?? Note;
        DiagnosisDate = diagnosisDate ?? DiagnosisDate;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateAiExplanation(string? aiExplanation)
    {
        AiExplanation = aiExplanation;
        UpdatedAt = DateTime.UtcNow;
    }
}