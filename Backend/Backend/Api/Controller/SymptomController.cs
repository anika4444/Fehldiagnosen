using Backend.Application.Common.Results;
using Backend.Application.Services.PatientService;
using Backend.Application.Services.SymptomService;
using Backend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Api.Controller
{
    [Authorize]
    [Route("api/symptoms")]
    [ApiController]
    public class SymptomController : ControllerBase
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
            {
                return Ok(result.Data);
            }
            
            return result.ErrorType switch
            {
                _ => BadRequest(result.ErrorMessage)
            };
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PatientSymptom>> GetById(int id)
        {
            var result = await _symptomService.GetByIdAsync(id);

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
            var result = await _symptomService.DeleteAsync(id);

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
