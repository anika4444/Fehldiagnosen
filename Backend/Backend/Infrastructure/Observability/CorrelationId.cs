namespace Backend.Infrastructure.Observability
{
    /// <summary>
    /// Vergibt jedem Request eine Request-ID (Header X-Request-ID, sonst neu erzeugt),
    /// schreibt sie in jeden Log-Eintrag dieses Requests und in die Antwort.
    /// Über <see cref="CorrelationIdHandler"/> wird sie an den AI-Service weitergereicht,
    /// so lassen sich Backend- und AI-Logs zu einem Aufruf zusammenführen.
    /// </summary>
    public sealed class CorrelationIdMiddleware
    {
        public const string HeaderName = "X-Request-ID";

        private readonly RequestDelegate _next;
        private readonly ILogger<CorrelationIdMiddleware> _logger;

        public CorrelationIdMiddleware(RequestDelegate next, ILogger<CorrelationIdMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var incoming = context.Request.Headers[HeaderName].ToString();
            // Fremde IDs nur übernehmen, wenn sie kurz und harmlos sind (Log-Injection vermeiden)
            var requestId = IsValid(incoming) ? incoming : Guid.NewGuid().ToString("N");

            context.TraceIdentifier = requestId;
            context.Response.Headers[HeaderName] = requestId;

            using (_logger.BeginScope(new Dictionary<string, object> { ["RequestId"] = requestId }))
            {
                await _next(context);
            }
        }

        private static bool IsValid(string value) =>
            !string.IsNullOrEmpty(value) && value.Length <= 64 && value.All(c => char.IsLetterOrDigit(c) || c == '-');
    }

    /// <summary>Hängt die Request-ID des aktuellen Requests an ausgehende HTTP-Aufrufe.</summary>
    public sealed class CorrelationIdHandler : DelegatingHandler
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CorrelationIdHandler(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var requestId = _httpContextAccessor.HttpContext?.TraceIdentifier;
            if (requestId != null && !request.Headers.Contains(CorrelationIdMiddleware.HeaderName))
            {
                request.Headers.Add(CorrelationIdMiddleware.HeaderName, requestId);
            }

            return base.SendAsync(request, cancellationToken);
        }
    }
}
