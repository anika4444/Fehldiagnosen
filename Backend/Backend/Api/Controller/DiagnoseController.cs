using Backend.Application.Common.Results;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.DiagnosisService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/diagnoses")]
public class DiagnosisController : BaseApiController
{
    private readonly IDiagnosisService _diagnosisService;

    public DiagnosisController(IDiagnosisService diagnosisService)
    {
        _diagnosisService = diagnosisService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetById(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _diagnosisService.GetByIdAsync(id, userId);

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
        var result = await _diagnosisService.DeleteAsync(id, userId);

        if (result.IsSuccess)
            return NoContent();

        return HandleServiceError(result.ErrorType, result.ErrorMessage);
    }
}