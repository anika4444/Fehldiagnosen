using Backend.Application.Common.Results;
using Backend.Application.Services;
using Backend.Application.Services.DrugInteractionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/known-medications")]
    public class KnownMedicationController : ControllerBase
    {
        private readonly IKnownMedicationService _service;
        private readonly IDrugInteractionService _drugInteractionService;
        private readonly IWebHostEnvironment _env;

        public KnownMedicationController(IKnownMedicationService service, IWebHostEnvironment env, IDrugInteractionService drugInteractionService)
        {
            _service = service;
            _env = env;
            _drugInteractionService = drugInteractionService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            var results = await _service.SearchAsync(q);
            return Ok(results);
        }

        [HttpPost("rebuild")]
        public async Task<IActionResult> Rebuild()
        {
            var csvPath = Path.Combine(_env.ContentRootPath, "src", "KnownMedications", "AlleMedikationenStrukturiert.csv");

            if (!System.IO.File.Exists(csvPath))
                return NotFound("CSV Datei nicht gefunden.");

            await _service.RebuildFromCsvAsync(csvPath);
            return Ok("Datenbank wurde aktualisiert.");
        }

        [HttpPost("rebuild-interactions")]
        public async Task<IActionResult> RebuildInteractions()
        {
            var xmlPath = Path.Combine(_env.ContentRootPath, "src", "KnownMedications", "interaction_database.xml");
            if (!System.IO.File.Exists(xmlPath))
                return NotFound("XML Datei nicht gefunden.");

            var results = await _drugInteractionService.ImportDrugDataAsync(xmlPath);
            
            if(results.IsSuccess) return Ok("Datenbank wurde aktualisiert");

            return BadRequest(results.ErrorMessage);
        }
    }
}