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
using Backend.Application.Services.MedicationNotification;
using Backend.Application.Services.MedicationService;
using Backend.Application.Services.FamilyHistoryService;
using Backend.Application.Services.FamilyHistoryService.Dto;
using Backend.Application.Services.MedicationService.Dto;
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
    private readonly IFamilyHistoryService _familyHistoryService;

    public PatientController(ISymptomService symptomService, IMedicalHistoryEntryService medicalHistoryEntryService, IMedicationNotificationService medicationNotificationService, IMedicationService medicationService, IFamilyHistoryService familyHistoryService)
    {
        _symptomService = symptomService;
        _medicationService = medicationService;
        _medicalHistoryEntryService = medicalHistoryEntryService;
        _medicationNotificationService = medicationNotificationService;
        _familyHistoryService = familyHistoryService;
    }

    #region Medication

    [HttpGet("{patientId}/medications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<MedicationResponse>>> GetMedicationsByPatientId(int patientId)
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
    public async Task<ActionResult> CreateMedication(int patientId, [FromBody]CreateMedicationRequest createMedicationRequest)
    {
        await _medicationService.CreateMedication(patientId, createMedicationRequest);
        await _medicationNotificationService.NotifyMedicationChanged();

        return Created();
    }

    [HttpPut("{patientId}/medications/{medicationId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicationResponse>> UpdateMedication(int patientId, int medicationId, [FromBody] CreateMedicationRequest request)
    {
        var result = await _medicationService.UpdateMedication(medicationId, request);

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

    #region Family History Entries

    [HttpGet("{patientId:int}/family-history-entries")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<FamilyHistoryEntryResponse>>> GetFamilyHistoryEntriesByPatientId(int patientId)
    {
        var result = await _familyHistoryService.GetAllByPatientIdAsync(patientId);

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

    [HttpPost("{patientId:int}/family-history-entries")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FamilyHistoryEntryResponse>> CreateFamilyHistoryEntry(int patientId, [FromBody] CreateFamilyHistoryEntryRequest request)
    {
        var result = await _familyHistoryService.CreateAsync(patientId, request);

        if (result.IsSuccess)
        {
            return CreatedAtAction(
                nameof(FamilyHistoryController.GetEntryByHistoryEntryId),
                "FamilyHistory",
                new { historyEntryId = result.Data!.Id },
                result.Data);
        }

        return result.ErrorType switch
        {
            ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
            _ => BadRequest(result.ErrorMessage)
        };
    }

    [HttpPut("{patientId:int}/family-history-entries/{historyEntryId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<FamilyHistoryEntryResponse>> UpdateFamilyHistoryEntry(int patientId, int historyEntryId, [FromBody] UpdateFamilyHistoryEntryRequest request)
    {
        var result = await _familyHistoryService.UpdateAsync(patientId, historyEntryId, request);

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

    #endregion
}
