using Backend.Application.Common.Results;
using Backend.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [ApiController]
    [Route("api/known-medications")]
    public class KnownMedicationController : ControllerBase
    {
        private readonly IKnownMedicationService _service;

        public KnownMedicationController(IKnownMedicationService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            var results = await _service.SearchAsync(q);
            return Ok(results);
        }

        [Authorize]
        [HttpPost("identify")]
        public async Task<IActionResult> Identify([FromBody] IdentifyRequest request)
        {
            var result = await _service.IdentifyAsync(
                brand: request.Brand,
                productName: request.ProductName,
                activeIngredient: request.ActiveIngredient,
                dosage: request.Dosage,
                form: request.Form
            );

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }

    public record IdentifyRequest(
        string? Brand,
        string? ProductName,
        string? ActiveIngredient,
        string? Dosage,
        string? Form
    );
}