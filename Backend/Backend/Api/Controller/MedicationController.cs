using Backend.Application.Common.Results;
using Backend.Application.Services.MedicationService;
using Backend.Application.Services.MedicationService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

//mögliche Erweiterung Get all medications
[Authorize]
[ApiController]
[Route("api/medications")]
public class MedicationController : ControllerBase
{
    private readonly IMedicationService _medicationService;
    public MedicationController(IMedicationService medicationService)
    {
        _medicationService = medicationService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]

    public async Task<ActionResult<MedicationResponse>> GetById(int id)

    {
        var result = await _medicationService.GetMedicationByIdAsync(id);
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteById(int id)
    {
        var result = await _medicationService.GetMedicationByIdAsync(id);
        if (result.IsSuccess)
        {
            await _medicationService.DeleteMedication(id);
            return NoContent();

        }

        return result.ErrorType switch
        {
            ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
            _ => BadRequest(result.ErrorMessage)
        };
    }
}

