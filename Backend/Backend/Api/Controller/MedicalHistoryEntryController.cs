using Microsoft.AspNetCore.Mvc;
using Backend.Domain.Entities;
using Backend.Application.Services.MedicalHistoryService;
using Backend.Application.Repositories;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/medical-history-entries")]
public class MedicalHistoryEntryController : ControllerBase
{
    private readonly IMedicalHistoryEntryService _medicalHistoryEntryService;

    public MedicalHistoryEntryController(IMedicalHistoryEntryService medicalHistoryEntryService)
    {
        _medicalHistoryEntryService = medicalHistoryEntryService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicalHistoryEntry>> GetById(int id)
    {
        var result = await _medicalHistoryEntryService.GetByIdAsync(id);

        if(result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<MedicalHistoryEntry>> Delete(int id)
    //public void Delete(int id)
    {
        var result = await _medicalHistoryEntryService.DeleteAsync(id);

        if(result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
}

