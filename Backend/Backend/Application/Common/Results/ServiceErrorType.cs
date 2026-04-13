namespace Backend.Application.Common.Results
{
    public enum ServiceErrorType
    {
        None,
        NotFound, // Object not found (404)
        Conflict, // Conflict with current state (409)
        ValidationError, // Validation failed (400)
        Unauthorized, // Unauthorized access (401)
        Forbidden, // Forbidden access (403)
    }
}
