using Backend.Application.Common.Results;
using Backend.Application.Services.MedicationService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/medications")]
public class MedicationController : BaseApiController
{
    private readonly IMedicationService _medicationService;

    public MedicationController(IMedicationService medicationService)
    {
        _medicationService = medicationService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetById(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicationService.GetByIdAsync(id, userId);

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
        var result = await _medicationService.DeleteAsync(id, userId);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}