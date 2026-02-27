using Microsoft.AspNetCore.Mvc;
using Backend.Domain.Entities;
namespace Backend.Api.Controller;

//mögliche Erweiterung Get all medications
//testing git

[ApiController]
[Route("api/Medications/{medicationId}")]
public class MedicationController : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public  ActionResult<Medication>GetById(int medicationId)
    
    {
        return Ok();
    }
}
