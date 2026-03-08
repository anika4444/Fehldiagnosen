using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
namespace Backend.Api.Controller;

[ApiController]
[Route("api/patients/")]
public class PatientController :ControllerBase
{
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
}
