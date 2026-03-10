using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Mysqlx.Session;

namespace Backend.Api.Controller
{
    [ApiController]
    [Route("api/family-history-entries")]
    public class FamilyHistoryController : ControllerBase
    {
        private readonly IFamilyHistoryRepository _repository;

        public FamilyHistoryController(IFamilyHistoryRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("family-history-entries/{historyEntryId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<FamilyHistoryEntry>>> GetEntriesByHistoryEntryId(int historyEntryId)
        {
            var entries = await _repository.FindByIdAsync(historyEntryId);

            if (entries == null)
            {
                return NotFound();
            }

            return Ok(entries);
        }


        [HttpGet("patients/{patientId:int}/family-history-entries")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntry>> GetEntriesByPatientId(int patientId)
        {
            var entry = await _repository.FindByPatientIdAsync(patientId);

            if (entry == null || !entry.Any())
            {
                return NotFound();
            }

            return Ok(entry);
        }

        [HttpPost("patients/{patientId:int}/family-history-entries")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<FamilyHistoryEntry>> CreateNewHistoryEntry(int patientId, [FromBody] FamilyHistoryEntry newEntry)
        {
            if (newEntry == null)
            {
                return BadRequest("Eintrag darf nicht leer sein");
            }

            newEntry.PatientId = patientId;

            var createdEntry = await _repository.AddAsync(newEntry);

            return CreatedAtAction(nameof(GetEntriesByHistoryEntryId), new { historyEntryId = createdEntry.Id }, createdEntry);
        }



    }
}
