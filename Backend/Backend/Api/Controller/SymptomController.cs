using Backend.Application.Common.Results;
using Backend.Application.Services.PatientService;
using Backend.Application.Services.SymptomService;
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
        public async Task<ActionResult> GetAllSymptomsDefinitionByName([FromQuery] string name)
        {
            var results = await _symptomService.GetSymptomDefinitionsByNameAsync(name);

            if (results.IsSuccess)
            {
                return Ok(results.Data);
            }
            
            return results.ErrorType switch
            {
                _ => BadRequest(results.ErrorMessage)
            };
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetSymptomById(int id)
        {
            var results = await _symptomService.GetById(id);

            if (results.IsSuccess)
            {
                return Ok(results.Data);
            }

            return results.ErrorType switch
            {
                ServiceErrorType.NotFound => NotFound(results.ErrorMessage),
                _ => BadRequest(results.ErrorMessage)
            };
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            var results = await _symptomService.DeletePatientSymptomAsync(id);

            if (results.IsSuccess)
            {
                return NoContent();
            }

            return results.ErrorType switch
            {
                ServiceErrorType.NotFound => NotFound(results.ErrorMessage),
                _ => BadRequest(results.ErrorMessage)
            };
        }
    }
}
