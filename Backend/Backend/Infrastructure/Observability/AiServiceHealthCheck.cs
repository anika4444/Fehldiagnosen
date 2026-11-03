using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Backend.Infrastructure.Observability
{
    /// <summary>
    /// Prüft, ob der AI-Service erreichbar und einsatzbereit ist (GET /ai/health).
    /// Ist er es nicht, meldet das Backend "Degraded" (HTTP 503): Die meisten Funktionen gehen weiter,
    /// nur die KI-Funktionen (Erklärungen, Arztbrief, Medikamenten-Scan, Checkup) nicht.
    /// Bei einem Datenbankausfall lautet der Status dagegen "Unhealthy".
    /// </summary>
    public sealed class AiServiceHealthCheck : IHealthCheck
    {
        public const string HttpClientName = "ai-health";

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _healthEndpoint;

        public AiServiceHealthCheck(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _healthEndpoint = configuration["AiServiceOptions:HealthEndpoint"] ?? "http://localhost:3000/ai/health";
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                var client = _httpClientFactory.CreateClient(HttpClientName);
                using var response = await client.GetAsync(_healthEndpoint, cancellationToken);

                return response.IsSuccessStatusCode
                    ? HealthCheckResult.Healthy($"AI-Service erreichbar ({_healthEndpoint})")
                    : new HealthCheckResult(context.Registration.FailureStatus,
                        $"AI-Service meldet HTTP {(int)response.StatusCode} ({_healthEndpoint})");
            }
            catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
            {
                return new HealthCheckResult(context.Registration.FailureStatus,
                    $"AI-Service nicht erreichbar ({_healthEndpoint})", ex);
            }
        }
    }
}
