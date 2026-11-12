using System.Collections.Concurrent;
using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Backend.Tests.Integration;
using Xunit.Abstractions;

namespace Backend.Tests.Stress;

/// <summary>
/// Stresstest: Viele Benutzer feuern gleichzeitig auf die API.
///
/// Phase 1: Alle Benutzer registrieren sich gleichzeitig und loggen sich ein.
/// Phase 2: Alle Benutzer legen parallel Medikamente an, listen, lesen und löschen sie.
/// Danach wird geprüft:
///   - kein einziger Request ist fehlgeschlagen (falscher Statuscode / Exception)
///   - jeder Benutzer sieht genau seine eigenen Medikamente (keine Vermischung unter Last)
///   - das 95. Perzentil der Antwortzeiten liegt unter dem Grenzwert
///
/// Konfiguration über Umgebungsvariablen:
///   STRESS_USERS        Anzahl gleichzeitiger Benutzer          (Standard 20)
///   STRESS_ITERATIONS   Durchläufe pro Benutzer                 (Standard 10)
///   STRESS_MAX_P95_MS   Grenzwert p95 für CRUD-Requests in ms   (Standard 2000)
///   STRESS_BASE_URL     z.B. http://localhost:5238 -> testet ein laufendes Backend
///                       statt eines In-Memory-Backends mit Test-Datenbank
/// </summary>
[Trait("Category", "Stress")]
public class ApiStressTests
{
    private const string Password = "geheim123";

    private readonly ITestOutputHelper _output;
    private readonly ConcurrentBag<RequestResult> _results = new();

    public ApiStressTests(ITestOutputHelper output)
    {
        _output = output;
    }

    private sealed record RequestResult(string Endpoint, double Milliseconds, HttpStatusCode? Status, bool Ok, string? Error);

    private sealed record LoggedInUser(HttpClient Client, int PatientId);

    private static int EnvInt(string name, int fallback) =>
        int.TryParse(Environment.GetEnvironmentVariable(name), out var value) && value > 0 ? value : fallback;

    [Fact]
    public async Task ManyConcurrentUsers_CanUseApiWithoutErrors()
    {
        var users = EnvInt("STRESS_USERS", 20);
        var iterations = EnvInt("STRESS_ITERATIONS", 10);
        var maxP95 = EnvInt("STRESS_MAX_P95_MS", 2000);
        var baseUrl = Environment.GetEnvironmentVariable("STRESS_BASE_URL");

        BackendApiFactory? factory = null;
        Func<HttpClient> createClient;

        if (string.IsNullOrWhiteSpace(baseUrl))
        {
            factory = new BackendApiFactory();
            await factory.InitializeAsync();
            createClient = factory.CreateClient;
        }
        else
        {
            createClient = () => new HttpClient { BaseAddress = new Uri(baseUrl), Timeout = TimeSpan.FromSeconds(60) };
        }

        try
        {
            _output.WriteLine($"Ziel: {(factory is null ? baseUrl : "In-Memory-Backend + MySQL-Testdatenbank")}");
            _output.WriteLine($"Benutzer: {users}, Durchläufe pro Benutzer: {iterations}");

            var total = Stopwatch.StartNew();

            // Phase 1: alle gleichzeitig registrieren + einloggen
            var loginTasks = Enumerable.Range(0, users).Select(_ => RegisterAndLogin(createClient()));
            var loggedIn = (await Task.WhenAll(loginTasks)).Where(u => u is not null).Cast<LoggedInUser>().ToList();

            // Phase 2: alle gleichzeitig auf die Medikamenten-API
            var expectedCounts = await Task.WhenAll(loggedIn.Select(u => RunWorkload(u, iterations)));

            total.Stop();

            // Ergebnis: jeder Benutzer sieht genau seine eigenen Medikamente
            var consistencyErrors = new List<string>();
            for (var i = 0; i < loggedIn.Count; i++)
            {
                var error = await CheckOwnData(loggedIn[i], expectedCounts[i]);
                if (error is not null) consistencyErrors.Add(error);
            }

            PrintReport(total.Elapsed);

            var failed = _results.Where(r => !r.Ok).ToList();
            Assert.True(failed.Count == 0,
                $"{failed.Count} von {_results.Count} Requests fehlgeschlagen, z.B.:\n" +
                string.Join("\n", failed.Take(10).Select(f => $"  {f.Endpoint}: {f.Status?.ToString() ?? "-"} {f.Error}")));

            Assert.Equal(users, loggedIn.Count);
            Assert.True(consistencyErrors.Count == 0, string.Join("\n", consistencyErrors));

            var crudTimes = _results.Where(r => !r.Endpoint.StartsWith("POST /api/authenticate")).Select(r => r.Milliseconds).ToList();
            var p95 = Percentile(crudTimes, 0.95);
            Assert.True(p95 <= maxP95, $"p95 der CRUD-Requests ist {p95:F0} ms (Grenzwert {maxP95} ms)");

            foreach (var user in loggedIn)
                user.Client.Dispose();
        }
        finally
        {
            if (factory is not null)
                await factory.DisposeAsync();
        }
    }

    private async Task<LoggedInUser?> RegisterAndLogin(HttpClient client)
    {
        var userName = $"stress_{Guid.NewGuid():N}"[..20];

        var register = await Send("POST /api/authenticate/register", HttpStatusCode.OK, () =>
            client.PostAsJsonAsync("/api/authenticate/register", new
            {
                userName,
                email = $"{userName}@stress.local",
                password = Password,
                role = "Patient",
                firstName = "Stress",
                lastName = "Test",
                dateOfBirth = "1990-01-01"
            }));
        if (register is null) return null;

        var login = await Send("POST /api/authenticate/login", HttpStatusCode.OK, () =>
            client.PostAsJsonAsync("/api/authenticate/login", new { username = userName, password = Password }));
        if (login is null) return null;

        var data = login.Value.GetProperty("data");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", data.GetProperty("token").GetString());
        return new LoggedInUser(client, data.GetProperty("patientId").GetInt32());
    }

    /// <summary>Feuert die CRUD-Requests eines Benutzers und liefert die Anzahl Medikamente, die übrig bleiben müssen.</summary>
    private async Task<int> RunWorkload(LoggedInUser user, int iterations)
    {
        var client = user.Client;
        var remaining = 0;

        for (var i = 0; i < iterations; i++)
        {
            var created = await Send("POST /api/patients/{id}/medications", HttpStatusCode.Created, () =>
                client.PostAsJsonAsync($"/api/patients/{user.PatientId}/medications", new
                {
                    name = $"Medikament {i}",
                    patientId = user.PatientId,
                    dosage = "100 mg",
                    intakeFrequency = "1x täglich",
                    intakeStartDate = "2026-01-01",
                    durationInDays = 30
                }));
            if (created is null) continue;
            remaining++;

            var medicationId = created.Value.GetProperty("id").GetInt32();

            await Send("GET /api/patients/{id}/medications", HttpStatusCode.OK, () =>
                client.GetAsync($"/api/patients/{user.PatientId}/medications"));

            await Send("GET /api/medications/{id}", HttpStatusCode.OK, () =>
                client.GetAsync($"/api/medications/{medicationId}"));

            // Jedes zweite Medikament wieder löschen
            if (i % 2 == 0)
            {
                var deleted = await Send("DELETE /api/medications/{id}", HttpStatusCode.NoContent, () =>
                    client.DeleteAsync($"/api/medications/{medicationId}"));
                if (deleted is not null) remaining--;
            }
        }

        return remaining;
    }

    private static async Task<string?> CheckOwnData(LoggedInUser user, int expectedCount)
    {
        var response = await user.Client.GetAsync($"/api/patients/{user.PatientId}/medications");
        if (response.StatusCode != HttpStatusCode.OK)
            return $"Patient {user.PatientId}: Liste lieferte {response.StatusCode}";

        var medications = JsonDocument.Parse(await response.Content.ReadAsStringAsync()).RootElement.EnumerateArray().ToList();

        if (medications.Count != expectedCount)
            return $"Patient {user.PatientId}: {medications.Count} Medikamente statt {expectedCount}";

        if (medications.Any(m => m.GetProperty("patientId").GetInt32() != user.PatientId))
            return $"Patient {user.PatientId}: sieht Medikamente eines anderen Patienten";

        return null;
    }

    /// <summary>Führt einen Request aus, misst die Zeit und liefert das JSON bei erwartetem Status, sonst null.</summary>
    private async Task<JsonElement?> Send(string endpoint, HttpStatusCode expected, Func<Task<HttpResponseMessage>> request)
    {
        var stopwatch = Stopwatch.StartNew();
        try
        {
            using var response = await request();
            var body = await response.Content.ReadAsStringAsync();
            stopwatch.Stop();

            var ok = response.StatusCode == expected;
            _results.Add(new RequestResult(endpoint, stopwatch.Elapsed.TotalMilliseconds, response.StatusCode, ok,
                ok ? null : body.Length > 200 ? body[..200] : body));

            if (!ok) return null;
            return string.IsNullOrWhiteSpace(body) ? default(JsonElement) : JsonDocument.Parse(body).RootElement.Clone();
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _results.Add(new RequestResult(endpoint, stopwatch.Elapsed.TotalMilliseconds, null, false, ex.Message));
            return null;
        }
    }

    private static double Percentile(List<double> values, double percentile)
    {
        if (values.Count == 0) return 0;
        var sorted = values.OrderBy(v => v).ToList();
        var index = (int)Math.Ceiling(percentile * sorted.Count) - 1;
        return sorted[Math.Clamp(index, 0, sorted.Count - 1)];
    }

    private void PrintReport(TimeSpan duration)
    {
        var all = _results.ToList();
        _output.WriteLine("");
        _output.WriteLine($"Requests gesamt: {all.Count}, Fehler: {all.Count(r => !r.Ok)}, Dauer: {duration.TotalSeconds:F1} s, Durchsatz: {all.Count / duration.TotalSeconds:F0} Requests/s");
        _output.WriteLine("");
        _output.WriteLine($"{"Endpoint",-40} {"Anzahl",7} {"Fehler",7} {"p50 ms",8} {"p95 ms",8} {"max ms",8}");

        foreach (var group in all.GroupBy(r => r.Endpoint).OrderBy(g => g.Key))
        {
            var times = group.Select(r => r.Milliseconds).ToList();
            _output.WriteLine(
                $"{group.Key,-40} {group.Count(),7} {group.Count(r => !r.Ok),7} " +
                $"{Percentile(times, 0.50),8:F0} {Percentile(times, 0.95),8:F0} {times.Max(),8:F0}");
        }
    }
}
