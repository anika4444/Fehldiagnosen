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
    public class FamilyHistoryEntryController : BaseApiController
    {
        private readonly IFamilyHistoryEntryService _familyHistoryEntryService;

        public FamilyHistoryEntryController(IFamilyHistoryEntryService familyHistoryEntryService)
        {
            _familyHistoryEntryService = familyHistoryEntryService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FamilyHistoryEntryResponse>> GetById(int id)
        {
            var result = await _familyHistoryEntryService.GetByIdAsync(id, GetCurrentUserId());

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
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _familyHistoryEntryService.DeleteAsync(id, GetCurrentUserId());

            if (result.IsSuccess)
            {
                return NoContent();
            }

            return result.ErrorType switch
            {
                ServiceErrorType.NotFound => NotFound(result.ErrorMessage),
                _ => BadRequest(result.ErrorMessage)
            };
        }
    }
}