using Backend.Application.Services;
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
        private readonly IWebHostEnvironment _env;

        public KnownMedicationController(IKnownMedicationService service, IWebHostEnvironment env)
        {
            _service = service;
            _env = env;
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
    }
}