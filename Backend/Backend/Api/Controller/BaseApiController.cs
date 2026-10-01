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
        protected ActionResult HandleServiceError(ServiceErrorType errorType, string? errorMessage)
        {
            return errorType switch
            {
                ServiceErrorType.NotFound => NotFound(errorMessage),
                ServiceErrorType.Forbidden => Forbid(),
                ServiceErrorType.Unauthorized => Unauthorized(errorMessage),
                ServiceErrorType.Conflict => Conflict(errorMessage),
                _ => BadRequest(errorMessage)
            };
        }
    }
}