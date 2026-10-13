using Backend.Application.Common.Results;
using Backend.Application.Services.SymptomService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [Authorize]
    [Route("api/symptoms")]
    [ApiController]
    public class SymptomController : BaseApiController
    {
        private readonly ISymptomService _symptomService;

        public SymptomController(ISymptomService symptomService)
        {
            _symptomService = symptomService;
        }

        [HttpGet("definition")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> GetAllSymptomDefinitionsByName([FromQuery] string name)
        {
            var result = await _symptomService.GetSymptomDefinitionsByNameAsync(name);

            if (result.IsSuccess)
                return Ok(result.Data);

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetById(int id)
        {
            var userId = IsArzt() ? null : GetCurrentUserId();
            var result = await _symptomService.GetByIdAsync(id, userId);

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
            var result = await _symptomService.DeleteAsync(id, userId);

            if (result.IsSuccess)
                return NoContent();

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }
    }
}