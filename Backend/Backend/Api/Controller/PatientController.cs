using Backend.Application.Common.Results;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Application.Services.MedicalHistoryEntryService;
using Backend.Application.Services.SymptomService;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Backend.Application.Services.MedicationNotification;
using Backend.Application.Services.MedicationService;
namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/patients/")]
public class PatientController : ControllerBase
{
    private readonly ISymptomService _symptomService;
    private readonly IMedicationService _medicationService;
    private readonly IMedicalHistoryEntryService _medicalHistoryEntryService;
    private readonly IMedicationNotificationService _medicationNotificationService;
    

    public PatientController(ISymptomService symptomService, IMedicalHistoryEntryService medicalHistoryEntryService, IMedicationNotificationService medicationNotificationService, IMedicationService medicationService)
    {
        _symptomService = symptomService;
        _medicationService = medicationService;
        _medicalHistoryEntryService = medicalHistoryEntryService;
        _medicationNotificationService = medicationNotificationService;
    }

    #region Medication
    [HttpGet("{patientId}/medications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<Medication>>> GetMedicationsByPatientId(int patientId)
    {
        var result = await _medicationService.GetMedicationsByPatientIdAsync(patientId);
        if (result.IsSuccess)
        {
            return Ok(result.Data);
        }      
        return result.ErrorType switch
        {
            ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
            _ => BadRequest(result.ErrorMessage)
        };        

    }

    [HttpPost("{patientId}/medications")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> CreateMedication(int patientId, int medicationId)
    {
        await _medicationNotificationService.NotifyMedicationChanged();
        return Created();
    }
    [HttpPut("{patientId}/medications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]

    public ActionResult UpdateMedication(int medicationId, int patientId)
    {
        var medicationToChange =_medicationService.GetMedicationByIdAsync(medicationId);
        if (medicationToChange.Id == medicationId)
        {

        }
        return Ok();
    }
    #endregion

    #region Symptoms
    [HttpGet("{patientId}/symptoms")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<PatientSymptomResponse>>> GetSymptomsById(int patientId, [FromQuery] DateTime? date)
    {
        var results = await (date != null ? _symptomService.GetPatientSymptomsByDateAsync(patientId, date.Value) : _symptomService.GetPatientSymptomsAsync(patientId));

        if (results.IsSuccess)
        {
            return Ok(results.Data);
        }

        return results.ErrorType switch
        {
            ServiceErrorType.NotFound => NotFound(results.ErrorMessage),
            _ => BadRequest(results.ErrorMessage)
        };
    }

    [HttpPost("{patientId}/symptoms")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PatientSymptomResponse>> CreateSymptom(int patientId, [FromBody] CreatePatientSymptomRequest symptom)
    {
        var results = await _symptomService.CreatePatientSymptomAsync(patientId, symptom);

        if (results.IsSuccess)
        {
            return CreatedAtAction(nameof(GetSymptomsById), new { patientId = patientId }, results.Data);
        }

        return results.ErrorType switch
        {
            ServiceErrorType.NotFound => NotFound(results.ErrorMessage),
            _ => BadRequest(results.ErrorMessage)
        };
    }

    [HttpPut("{patientId}/symptoms/{symptomId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateSymptom(int patientId, int symptomId, [FromBody] UpdatePatientSymptomRequest symptom)
    {
        var result = await _symptomService.UpdatePatientSymptomAsync(patientId, symptomId, symptom);
        
        if(result.IsSuccess)
        {
            return Ok(result.Data);
        }
        
        return result.ErrorType switch
        {
            ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
            _ => BadRequest(result.ErrorMessage)
        };
    }
    #endregion

    #region Medical History Entries
    [HttpGet("{patientId}/medical-history-entries")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<MedicalHistoryEntry>>> GetMedicalHistoryEntriesByPatientId(int patientId)
    {
        var results = await _medicalHistoryEntryService.GetAllAsync(patientId);

        return Ok(results);
    }

    [HttpPost("{patientId}/medical-history-entries")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MedicalHistoryEntryResponse>> CreateMedicalHistoryEntryForPatientId(int patientId, CreateMedicalHistoryEntryRequest request)
    {
        var result = await _medicalHistoryEntryService.CreateAsync(patientId, request);

        if (result == null)
        {
            return NotFound();
        }

        return CreatedAtAction(nameof(MedicalHistoryEntryController.GetById), "MedicalHistoryEntry", new { id = result.Id }, result);
    }

    [HttpPut("{patientId}/medical-history-entries/{medicalHistoryEntryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MedicalHistoryEntryResponse>> UpdateMedicalHistoryEntryForPatientId(int medicalHistoryEntryId, UpdateMedicalHistoryEntryRequest request)
    {
        var result = await _medicalHistoryEntryService.UpdateAsync(medicalHistoryEntryId, request);

        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
    #endregion
}
