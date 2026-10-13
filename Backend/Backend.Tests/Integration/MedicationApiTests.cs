using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace Backend.Tests.Integration;

/// <summary>
/// End-to-End über HTTP: Registrierung → Login (JWT) → Medikamente anlegen/lesen/löschen.
/// Deckt Controller, Authentifizierung, Services, Repositories und EF Core gegen MySQL ab.
/// </summary>
[Trait("Category", "Integration")]
public class MedicationApiTests : IClassFixture<BackendApiFactory>
{
    private const string Password = "geheim123";

    private readonly BackendApiFactory _factory;

    public MedicationApiTests(BackendApiFactory factory)
    {
        _factory = factory;
    }

    private static string UniqueName(string prefix) => $"{prefix}_{Guid.NewGuid():N}"[..20];

    private static async Task<JsonElement> ReadJson(HttpResponseMessage response)
    {
        var body = await response.Content.ReadAsStringAsync();
        return JsonDocument.Parse(body).RootElement.Clone();
    }

    private async Task<HttpResponseMessage> Register(HttpClient client, string userName, string role = "Patient") =>
        await client.PostAsJsonAsync("/api/authenticate/register", new
        {
            userName,
            email = $"{userName}@test.local",
            password = Password,
            role,
            firstName = "Test",
            lastName = "Patient",
            dateOfBirth = "1990-05-01"
        });

    /// <summary>Registriert einen Patienten, meldet ihn an und liefert einen authentifizierten Client.</summary>
    private async Task<(HttpClient Client, int PatientId)> CreateLoggedInPatient(string prefix)
    {
        var client = _factory.CreateClient();
        var userName = UniqueName(prefix);

        var register = await Register(client, userName);
        Assert.Equal(HttpStatusCode.OK, register.StatusCode);

        var login = await client.PostAsJsonAsync("/api/authenticate/login", new { username = userName, password = Password });
        Assert.Equal(HttpStatusCode.OK, login.StatusCode);

        var data = (await ReadJson(login)).GetProperty("data");
        var token = data.GetProperty("token").GetString();
        var patientId = data.GetProperty("patientId").GetInt32();

        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return (client, patientId);
    }

    private static Task<HttpResponseMessage> CreateMedication(HttpClient client, int patientId, string name) =>
        client.PostAsJsonAsync($"/api/patients/{patientId}/medications", new
        {
            name,
            patientId,
            dosage = "400 mg",
            intakeFrequency = "2x täglich",
            intakeStartDate = "2026-01-10",
            durationInDays = 14
        });

    [Fact]
    public async Task Patient_CanCreateReadAndDeleteOwnMedication()
    {
        var (client, patientId) = await CreateLoggedInPatient("anna");

        // Anlegen
        var create = await CreateMedication(client, patientId, "Ibuprofen");
        Assert.Equal(HttpStatusCode.Created, create.StatusCode);
        var created = await ReadJson(create);
        var medicationId = created.GetProperty("id").GetInt32();
        Assert.Equal("Ibuprofen", created.GetProperty("name").GetString());
        Assert.Equal(patientId, created.GetProperty("patientId").GetInt32());
        Assert.StartsWith("2026-01-24", created.GetProperty("endDate").GetString());

        // Liste des Patienten
        var list = await client.GetAsync($"/api/patients/{patientId}/medications");
        Assert.Equal(HttpStatusCode.OK, list.StatusCode);
        var names = (await ReadJson(list)).EnumerateArray().Select(m => m.GetProperty("name").GetString());
        Assert.Contains("Ibuprofen", names);

        // Einzelabruf
        var single = await client.GetAsync($"/api/medications/{medicationId}");
        Assert.Equal(HttpStatusCode.OK, single.StatusCode);
        Assert.Equal("400 mg", (await ReadJson(single)).GetProperty("dosage").GetString());

        // Löschen
        var delete = await client.DeleteAsync($"/api/medications/{medicationId}");
        Assert.Equal(HttpStatusCode.NoContent, delete.StatusCode);

        var afterDelete = await client.GetAsync($"/api/medications/{medicationId}");
        Assert.Equal(HttpStatusCode.NotFound, afterDelete.StatusCode);
    }

    [Fact]
    public async Task RequestWithoutToken_ReturnsUnauthorized()
    {
        var client = _factory.CreateClient();

        var response = await client.GetAsync("/api/patients/1/medications");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Patient_CannotAccessMedicationsOfOtherPatient()
    {
        var (owner, ownerPatientId) = await CreateLoggedInPatient("owner");
        var (intruder, _) = await CreateLoggedInPatient("intruder");

        var create = await CreateMedication(owner, ownerPatientId, "Metformin");
        var medicationId = (await ReadJson(create)).GetProperty("id").GetInt32();

        var list = await intruder.GetAsync($"/api/patients/{ownerPatientId}/medications");
        Assert.Equal(HttpStatusCode.Forbidden, list.StatusCode);

        var createForeign = await CreateMedication(intruder, ownerPatientId, "Fremd");
        Assert.Equal(HttpStatusCode.Forbidden, createForeign.StatusCode);

        var delete = await intruder.DeleteAsync($"/api/medications/{medicationId}");
        Assert.Equal(HttpStatusCode.Forbidden, delete.StatusCode);

        // Medikament des Besitzers ist unverändert vorhanden
        var stillThere = await owner.GetAsync($"/api/medications/{medicationId}");
        Assert.Equal(HttpStatusCode.OK, stillThere.StatusCode);
    }

    [Fact]
    public async Task Login_WithWrongPassword_ReturnsUnauthorized()
    {
        var client = _factory.CreateClient();
        var userName = UniqueName("wrongpw");
        await Register(client, userName);

        var login = await client.PostAsJsonAsync("/api/authenticate/login", new { username = userName, password = "falsch!!" });

        Assert.Equal(HttpStatusCode.Unauthorized, login.StatusCode);
    }

    [Fact]
    public async Task Register_SameUserTwice_ReturnsConflict()
    {
        var client = _factory.CreateClient();
        var userName = UniqueName("dup");

        Assert.Equal(HttpStatusCode.OK, (await Register(client, userName)).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await Register(client, userName)).StatusCode);
    }
}
