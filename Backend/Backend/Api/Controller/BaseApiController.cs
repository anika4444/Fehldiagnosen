using Backend.Application.Common.Results;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Api.Controller
{
    public abstract class BaseApiController : ControllerBase
    {
        protected string GetCurrentUserId()
        {
            return User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new InvalidOperationException("Kein authentifizierter Benutzer gefunden.");
        }
        protected bool IsArzt()
        {
            return User.IsInRole("Arzt");
        }

        //Wandelt ein ServiceResult mit Daten in die passende HTTP-Antwort um (Erfolg = 200 mit Daten)
        protected ActionResult ToActionResult<T>(ServiceResult<T> result)
        {
            return result.IsSuccess
                ? Ok(result.Data)
                : HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        //Wandelt ein ServiceResult ohne Daten in die passende HTTP-Antwort um (Erfolg = 204)
        protected ActionResult ToActionResult(ServiceResult result)
        {
            return result.IsSuccess
                ? NoContent()
                : HandleServiceError(result.ErrorType, result.ErrorMessage);
        }

        //Gemeinsame Zuordnung von Fehlertyp zu HTTP-Statuscode für alle Controller
        protected ActionResult HandleServiceError(ServiceErrorType errorType, string? errorMessage)
        {
            return errorType switch
            {
                ServiceErrorType.NotFound => NotFound(errorMessage),
                ServiceErrorType.Forbidden => Forbid(),
                ServiceErrorType.Unauthorized => Unauthorized(errorMessage),
                ServiceErrorType.Conflict => Conflict(errorMessage),
                ServiceErrorType.ValidationError => BadRequest(errorMessage),
                ServiceErrorType.InternalServerError => StatusCode(StatusCodes.Status500InternalServerError, errorMessage),
                _ => BadRequest(errorMessage)
            };
        }
    }
}