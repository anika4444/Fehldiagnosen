using Microsoft.AspNetCore.Mvc;
using Backend.Domain.Entities;

namespace Backend.Api.Controller;

//mögliche Erweiterung Get all medications

[ApiController]
[Route("api/medications")]
public class MedicationController : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Medication>GetById(int id)
    
    {
        return Ok();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult DeleteById(int id)
    {  return Ok(); }
}

