using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.FamilyHistoryService;
using Backend.Application.Services.FamilyHistoryService.Dto;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Session;

namespace Backend.Api.Controller
{
    [Authorize]
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
            var result = await _familyHistoryService.CreateAsync(patientId, request);

            if (result.IsSuccess)
            {
                return CreatedAtAction(nameof(GetEntryByHistoryEntryId), new { historyEntryId = result.Data.Id }, result.Data);
            }

            return result.ErrorType switch
            {
                ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
                _ => BadRequest(result.ErrorMessage)
            };
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