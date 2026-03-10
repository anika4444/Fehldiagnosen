using Backend.Application.Services.SymptomService;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
namespace Backend.Api.Controller;

[ApiController]
[Route("api/patients/")]
public class PatientController :ControllerBase
{
    private readonly ISymptomService _symptomService;
    public PatientController(ISymptomService symptomService)
    {
        _symptomService = symptomService;
    }
    #region Medication
    [HttpGet("{patientId:int}/medications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<IEnumerable<Medication>> GetMedicationsById(int patientId)
    {
        return Ok();

    }

    [HttpPost("{patientId:int}/medications/{medicationId:int}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult CreateMedication(int patientId, int medicationId)
    {
        return NoContent();
    }
    [HttpPut("{patientId}/medications/{medicationId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]

    public ActionResult UpdateMedication(int medicationId, int patientId)
    {
        return Ok();
    }
    #endregion

    #region Symptoms
    [HttpGet("{patientId}/symptoms")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<PatientSymptomResponse>>> GetSymptomsById(int patientId)
    {
        var results = await _symptomService.GetPatientSymptomsAsync(patientId);

        if(results == null) // TODO: Muss noch angepasst werden, dass zuerst der Patient abgefragt wird, ob es die Id überhaupt gibt.
        {
            return NotFound();
        }

        return Ok(results);
    }

    [HttpPost("{patientId}/symptoms")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PatientSymptomResponse>> CreateSymptom(int patientId, [FromBody] CreatePatientSymptomRequest symptom)
    {
        symptom.PatientId = patientId;
        var results = await _symptomService.CreatePatientSymptomAsync(symptom);
        return NoContent();
    }

    [HttpPut("{patientId}/symptoms/{symptomId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult UpdateSymptom(int patientId, int symptomId, [FromBody] PatientSymptom symptom)
    {
        return Ok();
    }
    #endregion
}
