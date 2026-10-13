using Backend.Infrastructure.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using Testcontainers.MySql;

namespace Backend.Tests.Integration;

/// <summary>
/// Startet das komplette Backend (Program.cs) im Speicher gegen eine echte MySQL-Datenbank.
///
/// - Ist die Umgebungsvariable TEST_MYSQL_CONNECTION gesetzt (z.B. in der CI), wird dieser
///   MySQL-Server verwendet und pro Testlauf eine eigene Datenbank angelegt und wieder gelöscht.
/// - Ansonsten wird per Testcontainers ein MySQL-Docker-Container gestartet (Docker muss laufen).
/// </summary>
public sealed class BackendApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    public const string ExternalConnectionVariable = "TEST_MYSQL_CONNECTION";

    private MySqlContainer? _container;
    private string _connectionString = string.Empty;

    public async Task InitializeAsync()
    {
        var external = Environment.GetEnvironmentVariable(ExternalConnectionVariable);

        if (!string.IsNullOrWhiteSpace(external))
        {
            var builder = new MySqlConnectionStringBuilder(external)
            {
                Database = $"adam_it_{Guid.NewGuid():N}"
            };
            _connectionString = builder.ConnectionString;
            return;
        }

        _container = new MySqlBuilder("mysql:8.0").Build();
        await _container.StartAsync();
        _connectionString = _container.GetConnectionString();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("ConnectionStrings:mySqlDb", _connectionString);
        builder.ConfigureLogging(logging => logging.SetMinimumLevel(LogLevel.Warning));
    }

    public new async Task DisposeAsync()
    {
        if (_container is null)
        {
            // Eigene Testdatenbank auf dem externen Server wieder entfernen
            using var scope = Services.CreateScope();
            await scope.ServiceProvider.GetRequiredService<MySqlDbContext>().Database.EnsureDeletedAsync();
        }

        await base.DisposeAsync();

        if (_container is not null)
            await _container.DisposeAsync();
    }
}
