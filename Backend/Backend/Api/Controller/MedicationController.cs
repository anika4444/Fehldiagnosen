using Microsoft.AspNetCore.Mvc;
using Backend.Domain.Entities;

namespace Backend.Api.Controller;

//mögliche Erweiterung Get all medications

[ApiController]
[Route("api/medications")]
public class MedicationController : ControllerBase
{
    [HttpGet("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<Medication>GetById(int Id)
    
    {
        return Ok();
    }

    [HttpDelete("{Id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult DeleteById(int Id)
    {  return Ok(); }
}

