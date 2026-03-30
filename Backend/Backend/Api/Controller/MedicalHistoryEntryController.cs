using Microsoft.AspNetCore.Mvc;
using Backend.Domain.Entities;
using Backend.Application.Services.MedicalHistoryEntryService;
using Microsoft.AspNetCore.Authorization;
using Backend.Application.Common.Results;

namespace Backend.Api.Controller;

[Authorize]
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

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await _medicalHistoryEntryService.DeleteAsync(id);

        if(result.IsSuccess)
        {
            return NoContent();
        }

        return result.ErrorType switch
        {
            ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
            _ => BadRequest(result.ErrorMessage)
        };
    }
}

