using System.Net;
using System.Text.Json;

namespace Backend.Tests.Integration;

/// <summary>
/// Health-Endpoints, Prometheus-Metriken und Request-ID gegen das komplette Backend.
/// Der AI-Service läuft im Test nicht, daher wird "Degraded" mit HTTP 503 erwartet.
/// </summary>
[Trait("Category", "Integration")]
public class ObservabilityApiTests : IClassFixture<BackendApiFactory>
{
    private readonly BackendApiFactory _factory;

    public ObservabilityApiTests(BackendApiFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Live_ist_ohne_Anmeldung_erreichbar()
    {
        var response = await _factory.CreateClient().GetAsync("/api/health/live");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains("Healthy", await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Health_prueft_Datenbank_und_meldet_fehlenden_AI_Service_als_Degraded()
    {
        var response = await _factory.CreateClient().GetAsync("/api/health");
        var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync()).RootElement;
        var checks = json.GetProperty("checks");

        // Ohne AI-Service ist das Backend nicht voll einsatzbereit → 503, Status im Body bleibt Degraded
        Assert.Equal(HttpStatusCode.ServiceUnavailable, response.StatusCode);
        Assert.Equal("Healthy", checks.GetProperty("database").GetProperty("status").GetString());
        Assert.Equal("Degraded", checks.GetProperty("ai-service").GetProperty("status").GetString());
        Assert.Equal("Degraded", json.GetProperty("status").GetString());
    }

    [Fact]
    public async Task Metrics_enthaelt_HTTP_und_Health_Metriken()
    {
        var client = _factory.CreateClient();
        await client.GetAsync("/api/version");
        await client.GetAsync("/api/health");

        var metrics = await client.GetStringAsync("/metrics");

        Assert.Contains("http_request_duration_seconds", metrics);
        Assert.Contains("endpoint=\"/api/version\"", metrics);
        Assert.Contains("aspnetcore_healthcheck_status{name=\"database\"} 1", metrics);
    }

    [Fact]
    public async Task Request_ID_wird_uebernommen_oder_neu_vergeben()
    {
        var client = _factory.CreateClient();

        var withId = new HttpRequestMessage(HttpMethod.Get, "/api/version");
        withId.Headers.Add("X-Request-ID", "test-request-42");
        var echoed = await client.SendAsync(withId);
        Assert.Equal("test-request-42", echoed.Headers.GetValues("X-Request-ID").Single());

        var generated = await client.GetAsync("/api/version");
        Assert.False(string.IsNullOrWhiteSpace(generated.Headers.GetValues("X-Request-ID").Single()));

        // Ungültige IDs (Log-Injection) werden ersetzt
        var injected = new HttpRequestMessage(HttpMethod.Get, "/api/version");
        injected.Headers.TryAddWithoutValidation("X-Request-ID", "abc\" fake=1");
        var replaced = await client.SendAsync(injected);
        Assert.NotEqual("abc\" fake=1", replaced.Headers.GetValues("X-Request-ID").Single());
    }
}
