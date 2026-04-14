using Backend.Application.Common.Results;
using Backend.Application.Services.CommunicationLevelService;
using Backend.Application.Services.CommunicationLevelService.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controller
{
    [Authorize]
    [ApiController]
    [Route("api/")]
    public class CommunicationLevelController : BaseApiController
    {
        private readonly ICommunicationLevelService _communicationLevelService;

        public CommunicationLevelController(ICommunicationLevelService communicationLevelService)
        {
            _communicationLevelService = communicationLevelService;
        }

        [HttpGet("communication-level/questions")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<CommunicationQuestionResponse>>> GetQuestions()
        {
            var result = await _communicationLevelService.GetQuestionsAsync();

            if (result.IsSuccess)
                return Ok(result.Data);

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        [HttpPost("patients/{patientId}/communication-level")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CommunicationLevelResponse>> Create(int patientId, [FromBody] CreateCommunicationLevelRequest request)
        {
            var userId = IsArzt() ? null : GetCurrentUserId();
            var result = await _communicationLevelService.CreateAsync(patientId, request, userId);

            if (result.IsSuccess)
                return CreatedAtAction(nameof(GetByPatientId), new { patientId }, result.Data);

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        [HttpGet("patients/{patientId}/communication-level")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CommunicationLevelResponse>> GetByPatientId(int patientId)
        {
            var userId = IsArzt() ? null : GetCurrentUserId();
            var result = await _communicationLevelService.GetByPatientIdAsync(patientId, userId);

            if (result.IsSuccess)
                return Ok(result.Data);

            return HandleServiceError(result.ErrorType, result.ErrorMessage);
        }
    }
}