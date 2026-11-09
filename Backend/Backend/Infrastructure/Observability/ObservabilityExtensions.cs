using System.Reflection;
using System.Text.Json;
using Backend.Infrastructure.Repositories;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Prometheus;

namespace Backend.Infrastructure.Observability
{
    /// <summary>
    /// Logs, Health-Checks und Metriken an einer Stelle:
    ///   GET /api/health       → Zustand inkl. Datenbank und AI-Service (200 Healthy, 503 Degraded/Unhealthy)
    ///   GET /api/health/live  → Prozess läuft (ohne Abhängigkeiten zu prüfen)
    ///   GET /metrics          → Prometheus-Metriken
    /// </summary>
    public static class ObservabilityExtensions
    {
        private const string ReadyTag = "ready";

        public static WebApplicationBuilder AddObservability(this WebApplicationBuilder builder)
        {
            // ─── Logs ───
            // Development: eine lesbare Zeile pro Eintrag. Sonst JSON, damit Log-Tools die Felder
            // (Level, Kategorie, RequestId, ...) auswerten können. Scopes enthalten die RequestId.
            if (builder.Environment.IsDevelopment())
            {
                builder.Logging.AddSimpleConsole(o =>
                {
                    o.SingleLine = true;
                    o.IncludeScopes = true;
                    o.TimestampFormat = "HH:mm:ss ";
                });
            }
            else
            {
                builder.Logging.AddJsonConsole(o =>
                {
                    o.IncludeScopes = true;
                    o.UseUtcTimestamp = true;
                    o.TimestampFormat = "yyyy-MM-ddTHH:mm:ss.fffZ";
                });
            }

            // Ein Eintrag pro Request mit Methode, Pfad, Status und Dauer.
            // Bewusst ohne Query-String, Header und Body (Token, Patientendaten).
            builder.Services.AddHttpLogging(o =>
            {
                o.LoggingFields = HttpLoggingFields.RequestMethod
                    | HttpLoggingFields.RequestPath
                    | HttpLoggingFields.ResponseStatusCode
                    | HttpLoggingFields.Duration;
                o.CombineLogs = true;
            });

            // Request-ID an alle ausgehenden HTTP-Aufrufe hängen.
            // UseHttpClientMetrics() bleibt deaktiviert: prometheus-net 8.2.1
            // erzeugt hier bei HttpClient-Aufrufen einen Null-Labelwert und wirft
            // dadurch eine NotSupportedException.
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddTransient<CorrelationIdHandler>();
            builder.Services.ConfigureHttpClientDefaults(http => http
                .AddHttpMessageHandler<CorrelationIdHandler>());

            // ─── Health-Checks ───
            builder.Services.AddHttpClient(AiServiceHealthCheck.HttpClientName, c => c.Timeout = TimeSpan.FromSeconds(3));
            builder.Services.AddHealthChecks()
                .AddDbContextCheck<MySqlDbContext>("database", tags: [ReadyTag])
                .AddCheck<AiServiceHealthCheck>("ai-service", failureStatus: HealthStatus.Degraded, tags: [ReadyTag])
                // Ergebnis zusätzlich als Metrik aspnetcore_healthcheck_status (0/0.5/1)
                .ForwardToPrometheus();

            return builder;
        }

        /// <summary>Muss vor UseCors/UseAuthentication aufgerufen werden.</summary>
        public static WebApplication UseObservability(this WebApplication app)
        {
            app.UseMiddleware<CorrelationIdMiddleware>();

            // Health- und Metrik-Abfragen kommen alle paar Sekunden und würden das Log fluten
            app.UseWhen(ctx => !IsMonitoringRequest(ctx.Request.Path), branch => branch.UseHttpLogging());

            // UseHttpMetrics braucht das Routing davor, damit die Metriken die Route
            // ("api/patients/{id}") statt der konkreten URL als Label bekommen
            app.UseRouting();
            app.UseHttpMetrics();

            LogStartup(app);
            return app;
        }

        public static WebApplication MapObservabilityEndpoints(this WebApplication app)
        {
            app.MapHealthChecks("/api/health/live", new HealthCheckOptions
            {
                Predicate = _ => false,
                ResponseWriter = WriteHealthResponse
            });

            app.MapHealthChecks("/api/health", new HealthCheckOptions
            {
                Predicate = check => check.Tags.Contains(ReadyTag),
                ResponseWriter = WriteHealthResponse,
                // Standard wäre 200 bei Degraded. Ohne AI-Service ist das Backend aber nicht voll
                // einsatzbereit, daher 503. Der Body unterscheidet weiterhin Degraded/Unhealthy.
                ResultStatusCodes =
                {
                    [HealthStatus.Healthy] = StatusCodes.Status200OK,
                    [HealthStatus.Degraded] = StatusCodes.Status503ServiceUnavailable,
                    [HealthStatus.Unhealthy] = StatusCodes.Status503ServiceUnavailable
                }
            });

            app.MapMetrics("/metrics");
            return app;
        }

        private static bool IsMonitoringRequest(PathString path) =>
            path.StartsWithSegments("/api/health") || path.StartsWithSegments("/metrics");

        private static void LogStartup(WebApplication app)
        {
            var version = typeof(Program).Assembly
                .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?
                .InformationalVersion;

            app.Lifetime.ApplicationStarted.Register(() =>
                app.Logger.LogInformation("Backend gestartet: Version {Version}, Umgebung {Environment}, URLs {Urls}",
                    version, app.Environment.EnvironmentName, string.Join(", ", app.Urls)));
        }

        // Ausnahmedetails werden bewusst nicht ausgegeben, nur Status und Beschreibung pro Check
        private static Task WriteHealthResponse(HttpContext context, HealthReport report)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            var body = new
            {
                status = report.Status.ToString(),
                totalDurationMs = Math.Round(report.TotalDuration.TotalMilliseconds),
                checks = report.Entries.ToDictionary(
                    e => e.Key,
                    e => new
                    {
                        status = e.Value.Status.ToString(),
                        description = e.Value.Description,
                        durationMs = Math.Round(e.Value.Duration.TotalMilliseconds)
                    })
            };

            return context.Response.WriteAsync(JsonSerializer.Serialize(body, JsonSerializerOptions.Web), context.RequestAborted);
        }
    }
}
