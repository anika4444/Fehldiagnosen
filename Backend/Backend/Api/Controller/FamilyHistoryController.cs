using Backend.Application.Common.Results;
using Backend.Application.Services.FamilyHistoryService;
using Backend.Application.Services.FamilyHistoryService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/family-history-entries")]
    public class FamilyHistoryController : ControllerBase
    {
        private readonly IFamilyHistoryService _familyHistoryService;

        public FamilyHistoryController(IFamilyHistoryService familyHistoryService)
        {
            _familyHistoryService = familyHistoryService;
        }

        // GET /api/family-history-entries/{historyEntryId}
        [HttpGet("{historyEntryId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntryResponse>> GetEntryByHistoryEntryId(int historyEntryId)
        {
            var result = await _familyHistoryService.GetByIdAsync(historyEntryId);

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

        // DELETE /api/family-history-entries/{historyEntryId}
        [HttpDelete("{historyEntryId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntryResponse>> DeleteEntry(int historyEntryId)
        {
            var result = await _familyHistoryService.DeleteAsync(historyEntryId);

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
    }
}