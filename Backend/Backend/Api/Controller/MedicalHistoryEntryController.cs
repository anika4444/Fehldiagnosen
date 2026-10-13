using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.MedicalHistoryEntryService;
using Microsoft.AspNetCore.Authorization;
using Backend.Application.Common.Results;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/medical-history-entries")]
public class MedicalHistoryEntryController : BaseApiController
{
    private readonly IMedicalHistoryEntryService _medicalHistoryEntryService;

    public MedicalHistoryEntryController(IMedicalHistoryEntryService medicalHistoryEntryService)
    {
        _medicalHistoryEntryService = medicalHistoryEntryService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetById(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalHistoryEntryService.GetByIdAsync(id, userId);

        if (result.IsSuccess)
            return Ok(result.Data);

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> Delete(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalHistoryEntryService.DeleteAsync(id, userId);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}