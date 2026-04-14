using Backend.Application.Common.Results;
using Backend.Application.Services.DoctorService;
using Backend.Application.Services.DoctorService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/doctors")]
    public class DoctorController : BaseApiController
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<DoctorResponse>>> GetAll()
        {
            var result = await _doctorService.GetAllAsync();

            if (result.IsSuccess)
                return Ok(result.Data);

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DoctorResponse>> GetById(int id)
        {
            var result = await _doctorService.GetByIdAsync(id);

            if (result.IsSuccess)
                return Ok(result.Data);

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DoctorResponse>> Update(int id, [FromBody] UpdateDoctorRequest request)
        {
            var result = await _doctorService.UpdateAsync(id, request, GetCurrentUserId());

            if (result.IsSuccess)
                return Ok(result.Data);

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }
    }
}