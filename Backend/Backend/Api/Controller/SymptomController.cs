using Backend.Application.Services.SymptomService;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Api.Controller
{
    [Route("api/symptoms")]
    [ApiController]
    public class SymptomController : ControllerBase
    {
        private readonly ISymptomService _symptomService;
        public SymptomController(ISymptomService symptomService)
        {
            _symptomService = symptomService;        
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetAllSymptoms()
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult Delete(int id)
        {
            return Ok();
        }
    }
}
