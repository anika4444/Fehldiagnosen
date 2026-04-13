using Backend.Application.Common.Results;
using Backend.Application.Services.MedicalHistoryEntryService;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Application.Services.MedicationNotification;
using Backend.Application.Services.MedicationService;
using Backend.Application.Services.MedicationService.Dto;
using Backend.Application.Services.SymptomService;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Backend.Application.Services.FamilyHistoryService;
using Backend.Application.Services.FamilyHistoryService.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/patients/")]
public class PatientController : BaseApiController
{
    private readonly ISymptomService _symptomService;
    private readonly IMedicationService _medicationService;
    private readonly IMedicalHistoryEntryService _medicalHistoryEntryService;
    private readonly IMedicationNotificationService _medicationNotificationService;
    private readonly IFamilyHistoryEntryService _familyHistoryEntryService;

    public PatientController(ISymptomService symptomService, IMedicalHistoryEntryService medicalHistoryEntryService, IMedicationNotificationService medicationNotificationService, IMedicationService medicationService, IFamilyHistoryEntryService familyHistoryEntryService)
    {
        _symptomService = symptomService;
        _medicationService = medicationService;
        _medicalHistoryEntryService = medicalHistoryEntryService;
        _medicationNotificationService = medicationNotificationService;
        _familyHistoryEntryService = familyHistoryEntryService;
    }

    #region Medication

    [HttpGet("{patientId}/medications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<MedicationResponse>>> GetMedicationsByPatientId(int patientId)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.GetAllAsync(patientId, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("{patientId}/medications")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicationResponse>> CreateMedicationForPatientId(int patientId, [FromBody] CreateMedicationRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.CreateAsync(patientId, request, userId);
        await _medicationNotificationService.NotifyMedicationChanged();

        if (result.IsSuccess)
            return CreatedAtAction(nameof(MedicationController.GetById), "Medication", new { id = result.Data.Id }, result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPut("{patientId}/medications/{medicationId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicationResponse>> UpdateMedicationForPatientId(int patientId, int medicationId, [FromBody] UpdateMedicationRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.UpdateAsync(patientId, medicationId, request, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #endregion

    #region Symptoms

    [HttpGet("{patientId}/symptoms")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<PatientSymptomResponse>>> GetSymptomsByPatientId(int patientId, [FromQuery] DateTime? date)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await (date != null ? _symptomService.GetAllByDateAsync(patientId, date.Value, userId) : _symptomService.GetAllAsync(patientId, userId));

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("{patientId}/symptoms")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PatientSymptomResponse>> CreateSymptomForPatientId(int patientId, [FromBody] CreatePatientSymptomRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _symptomService.CreateAsync(patientId, request, userId);

        if (result.IsSuccess)
            return CreatedAtAction(nameof(SymptomController.GetById), "Symptom", new { id = result.Data.Id }, result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPut("{patientId}/symptoms/{symptomId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PatientSymptomResponse>> UpdateSymptomForPatientId(int patientId, int symptomId, [FromBody] UpdatePatientSymptomRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _symptomService.UpdateAsync(patientId, symptomId, request, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #endregion

    #region Medical History Entries

    [HttpGet("{patientId}/medical-history-entries")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<MedicalHistoryEntryResponse>>> GetMedicalHistoryEntriesByPatientId(int patientId)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalHistoryEntryService.GetAllAsync(patientId, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("{patientId}/medical-history-entries")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MedicalHistoryEntryResponse>> CreateMedicalHistoryEntryForPatientId(int patientId, [FromBody] CreateMedicalHistoryEntryRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalHistoryEntryService.CreateAsync(patientId, request, userId);

        if (result.IsSuccess)
            return CreatedAtAction(nameof(MedicalHistoryEntryController.GetById), "MedicalHistoryEntry", new { id = patientId }, result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPut("{patientId}/medical-history-entries/{medicalHistoryEntryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MedicalHistoryEntryResponse>> UpdateMedicalHistoryEntryForPatientId(int patientId, int medicalHistoryEntryId, [FromBody] UpdateMedicalHistoryEntryRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalHistoryEntryService.UpdateAsync(patientId, medicalHistoryEntryId, request, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #endregion

    #region Family History Entries

    [HttpGet("{patientId}/family-history-entries")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<FamilyHistoryEntryResponse>>> GetFamilyHistoryEntriesByPatientId(int patientId)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _familyHistoryEntryService.GetAllAsync(patientId, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPost("{patientId}/family-history-entries")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FamilyHistoryEntryResponse>> CreateFamilyHistoryEntryForPatientId(int patientId, [FromBody] CreateFamilyHistoryEntryRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _familyHistoryEntryService.CreateAsync(patientId, request, userId);

        if (result.IsSuccess)
            return CreatedAtAction(nameof(FamilyHistoryEntryController.GetById), "FamilyHistoryEntry", new { id = result.Data.Id }, result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpPut("{patientId}/family-history-entries/{familyHistoryEntryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FamilyHistoryEntryResponse>> UpdateFamilyHistoryEntryForPatientId(int patientId, int familyHistoryEntryId, [FromBody] UpdateFamilyHistoryEntryRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _familyHistoryEntryService.UpdateAsync(patientId, familyHistoryEntryId, request, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    #endregion
}