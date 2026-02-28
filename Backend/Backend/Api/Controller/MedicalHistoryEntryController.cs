using Microsoft.AspNetCore.Mvc;
using Backend.Domain.Entities;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/medical-history-entries")]
public class MedicalHistoryEntryController : ControllerBase
{
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<MedicalHistoryEntry> GetById(int id)
    {
        return Ok();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<MedicalHistoryEntry> Delete(int id)
    {
        return Ok();
    }
}

