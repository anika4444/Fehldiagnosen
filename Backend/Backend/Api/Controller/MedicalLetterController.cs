using Backend.Application.Interfaces;
using Backend.Application.Services.MedicalLetterService.Dto;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller;

[ApiController]
[Route("api/MedicalLetters")]
public class MedicalLetterController : ControllerBase
{
    private IMedicalLetterService _medicalLetterService;
    public MedicalLetterController(IMedicalLetterService medicalLetterService)
    {
        _medicalLetterService = medicalLetterService;
    }

    [HttpPost]
    public async Task<ActionResult> CreateAsync([FromBody] CreateMedicalLetterRequest request)
    {
        var newMedicalLetter = await _medicalLetterService.CreateAsync(request, null);
        return Created();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetByIdAsync(int id)
    {
        var letter = await _medicalLetterService.GetByIdAsync(id, null);
        return Ok(letter);
    }

    [HttpGet("patient/{patientId}")]
    public async Task<ActionResult> GetByPatientIdAsync(int patientId)
    {
        var letters = await _medicalLetterService.GetByPatientIdAsync(patientId, null);
        return Ok(letters);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAsync(int id, [FromBody] CreateMedicalLetterRequest request)
    {
        var updatedLetter = await _medicalLetterService.UpdateAsync(id, request, null);
        return Ok(updatedLetter);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAsync(int id)
    {
        await _medicalLetterService.DeleteAsync(id, null);
        return NoContent();
    }
}