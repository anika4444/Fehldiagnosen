namespace Backend.Application.Common.Results
{
    public class ServiceResult
    {
        public bool IsSuccess => ErrorType == ServiceErrorType.None;
        public string? ErrorMessage { get; set; }
        public ServiceErrorType ErrorType { get; set; }
        // Helper methods
        public static ServiceResult Success()
        {
            return new ServiceResult { ErrorType = ServiceErrorType.None };
        }
        public static ServiceResult Conflict(string errorMessage)
        {
            return new ServiceResult { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.Conflict };
        }
        public static ServiceResult NotFound(string errorMessage)
        {
            return new ServiceResult { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.NotFound };
        }
        public static ServiceResult Invalid(string errorMessage)
        {
            return new ServiceResult { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.ValidationError };
        }
        public static ServiceResult Unauthorized(string errorMessage)
        {
            return new ServiceResult { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.Unauthorized };
        }

    }
    public class ServiceResult<T> : ServiceResult
    {
        public T? Data { get; set; }

        // Helper methods

        public static ServiceResult<T> Success(T data)
        {
            return new ServiceResult<T> { Data = data, ErrorType = ServiceErrorType.None };
        }

        public static ServiceResult<T> Conflict(string errorMessage)
        {
            return new ServiceResult<T> { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.Conflict };
        }

        public static ServiceResult<T> NotFound(string errorMessage)
        {
            return new ServiceResult<T> { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.NotFound };
        }

        public static ServiceResult<T> Invalid(string errorMessage)
        {
            return new ServiceResult<T> { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.ValidationError };
        }

        public static ServiceResult<T> Unauthorized(string errorMessage)
        {
            return new ServiceResult<T> { ErrorMessage = errorMessage, ErrorType = ServiceErrorType.Unauthorized };
        }
    }
}
