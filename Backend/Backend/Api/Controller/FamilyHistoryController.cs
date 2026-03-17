using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Session;
using Backend.Application.Services.FamilyHistoryService;
using Backend.Application.Services.FamilyHistoryService.Dto;

namespace Backend.Api.Controller
{
    [ApiController]
    [Route("api")]
    public class FamilyHistoryController : ControllerBase
    {
        private readonly IFamilyHistoryService _familyHistoryService;

        public FamilyHistoryController(IFamilyHistoryService familyHistoryService)
        {
            _familyHistoryService = familyHistoryService;
        }

        // GET /api/family-history-entries/{historyEntryId}
        [HttpGet("family-history-entries/{historyEntryId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntryResponse>> GetEntryByHistoryEntryId(int historyEntryId)
        {
            var entry = await _familyHistoryService.GetByIdAsync(historyEntryId);
            if (entry == null) return NotFound();
            return Ok(entry);
        }

        // GET /api/patients/{patientId}/family-history-entries
        [HttpGet("patients/{patientId:int}/family-history-entries")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<FamilyHistoryEntryResponse>>> GetEntriesByPatientId(int patientId)
        {
            var entries = await _familyHistoryService.GetAllByPatientIdAsync(patientId);
            if (entries == null || !entries.Any()) return NotFound();
            return Ok(entries);
        }

        // POST /api/patients/{patientId}/family-history-entries
        [HttpPost("patients/{patientId:int}/family-history-entries")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntryResponse>> CreateEntry(int patientId, [FromBody] CreateFamilyHistoryEntryRequest request)
        {
            if (request == null) return BadRequest("Eintrag darf nicht leer sein.");
            var createdEntry = await _familyHistoryService.CreateAsync(patientId, request);
            if (createdEntry == null) return NotFound();
            return CreatedAtAction(nameof(GetEntryByHistoryEntryId), new { historyEntryId = createdEntry.Id }, createdEntry);
        }

        // PUT /api/patients/{patientId}/family-history-entries/{historyEntryId}
        [HttpPut("patients/{patientId:int}/family-history-entries/{historyEntryId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntryResponse>> UpdateEntry(int patientId, int historyEntryId, [FromBody] UpdateFamilyHistoryEntryRequest request)
        {
            if (request == null) return BadRequest("Eintrag darf nicht leer sein.");
            var updatedEntry = await _familyHistoryService.UpdateAsync(patientId, historyEntryId, request);
            if (updatedEntry == null) return NotFound();
            return Ok(updatedEntry);
        }

        // DELETE /api/family-history-entries/{historyEntryId}
        [HttpDelete("family-history-entries/{historyEntryId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntryResponse>> DeleteEntry(int historyEntryId)
        {
            var deletedEntry = await _familyHistoryService.DeleteAsync(historyEntryId);
            if (deletedEntry == null) return NotFound();
            return Ok(deletedEntry);
        }
    }
}