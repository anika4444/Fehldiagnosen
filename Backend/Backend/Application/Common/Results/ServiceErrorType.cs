namespace Backend.Application.Common.Results
{
    public enum ServiceErrorType
    {
        None,
        NotFound, // Object not found (404)
        Conflict, // Conflict with current state (409)
        ValidationError, // Validation failed (400)
        Unauthorized, // Unauthorized access (401)
        InternalServerError, // Internal server error (500)
        Forbidden, // Forbidden access (403)
        UnprocessableEntity, // Request understood but result not usable (422)
    }
}
