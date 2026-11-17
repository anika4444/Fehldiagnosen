using Backend.Application.Interfaces;
using Backend.Application.Services.MedicalLetterService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[Authorize]
[ApiController]
[Route("api/MedicalLetters")]
public class MedicalLetterController : BaseApiController
{
    private readonly IMedicalLetterService _medicalLetterService;

    public MedicalLetterController(IMedicalLetterService medicalLetterService)
    {
        _medicalLetterService = medicalLetterService;
    }

    [HttpPost]
    public async Task<ActionResult> CreateAsync([FromBody] CreateMedicalLetterRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalLetterService.CreateAsync(request, userId);

        return ToActionResult(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetByIdAsync(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalLetterService.GetByIdAsync(id, userId);

        return ToActionResult(result);
    }

    [HttpGet("patient/{patientId}")]
    public async Task<ActionResult> GetByPatientIdAsync(int patientId)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalLetterService.GetByPatientIdAsync(patientId, userId);

        return ToActionResult(result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAsync(int id, [FromBody] CreateMedicalLetterRequest request)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalLetterService.UpdateAsync(id, request, userId);

        return ToActionResult(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync(int id)
    {
        var userId = IsArzt() ? null : GetCurrentUserId();
        var result = await _medicalLetterService.DeleteAsync(id, userId);

        return ToActionResult(result);
    }
}
