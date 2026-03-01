using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
namespace Backend.Api.Controller;

[ApiController]
[Route("api/patients/")]
public class PatientController :ControllerBase
{
    [HttpGet("{patientId:int}/medications")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<IEnumerable<Medication>> GetMedicationsById(int patientId)
    {
        return Ok();

    }

    [HttpPost("{patientId:int}/medications/{medicationId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult AssignNewMedicationToPatient(int patientId, int medicationId)
    {
        return NoContent();
    }
    
}
