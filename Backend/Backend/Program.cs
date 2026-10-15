using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services;
using Backend.Application.Services.AIService;
using Backend.Application.Services.AnonymizerService;
using Backend.Application.Services.CommunicationLevelService;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.FamilyHistoryService;
using Backend.Application.Services.HealthTipService;
using Backend.Application.Services.MedicalHistoryEntryService;
using Backend.Application.Services.MedicationService;
using Backend.Application.Services.PatientService;
using Backend.Application.Services.SymptomService;
using Backend.Application.Services.UserService;
using Backend.Domain.Entities;
using Backend.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using Scalar.AspNetCore;
using Backend.Application.Services.DrugInteractionService;
using Backend.Application.Services.CheckupService;
using Backend.Api.Controller;
using Backend.Api.Middleware;
using Backend.Application.Services.EmergencyAccessService;
using Backend.Application.Services.EmergencyAccessService.Dto;
using Backend.Application.Services.EmergencyDataService;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });

    // The public emergency portal may only call from its own origin
    var emergencyOrigins = builder.Configuration.GetSection("Emergency:AllowedOrigins").Get<string[]>()
        ?? new[] { "http://localhost:5173" };

    options.AddPolicy(EmergencyPortalController.CorsPolicy, policy =>
    {
        policy.WithOrigins(emergencyOrigins)
            .WithMethods("GET", "POST", "DELETE")
            .WithHeaders("Content-Type", EmergencyPortalController.SessionHeader)
            // The session header forces a preflight request, caching it halves the number of calls
            .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });
});

// Wrong values here would break the lock after failed PINs, so the app refuses to start with them
builder.Services.AddOptions<EmergencyOptions>()
    .Bind(builder.Configuration.GetSection("Emergency"))
    .Validate(o => o.MaxFailedAttempts > 0 && o.LockMinutes > 0 && o.EmergencySessionMinutes > 0
            && o.TreatmentSessionMinutes > 0 && o.OneTimeLinkHours > 0 && o.ApprovalWindowMinutes > 0,
        "All numbers in the Emergency section of appsettings.json must be greater than 0.")
    .ValidateOnStart();
builder.Services.AddMemoryCache();

// Behind a reverse proxy (HTTPS on the subdomain) every request comes from the proxy address.
// Listing the proxy here lets the rate limit and the access log see the real client address.
// Only listed proxies are trusted, otherwise anybody could fake the X-Forwarded-For header.
var trustedProxies = builder.Configuration.GetSection("Emergency:TrustedProxies").Get<string[]>() ?? Array.Empty<string>();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    foreach (var proxy in trustedProxies)
    {
        options.KnownProxies.Add(IPAddress.Parse(proxy));
    }
});

// Brute force protection for the portal, per IP (IPv6 per /64). The lock per emergency id is in EmergencyAccessService.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy(EmergencyPortalController.LoginRateLimit, context =>
        RateLimitPartition.GetSlidingWindowLimiter(
            ClientAddress.PartitionKey(context),
            _ => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1),
                SegmentsPerWindow = 6,
                QueueLimit = 0
            }));

    options.AddPolicy(EmergencyPortalController.ReadRateLimit, context =>
        RateLimitPartition.GetFixedWindowLimiter(
            ClientAddress.PartitionKey(context),
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 120,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));

    options.OnRejected = async (context, cancellationToken) =>
    {
        await context.HttpContext.Response.WriteAsJsonAsync(
            new { message = "Zu viele Anfragen. Bitte kurz warten und erneut versuchen." },
            cancellationToken);
    };
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHttpClient();

builder.Services.AddScoped<IPatientSymptomRepository, MySqlSymptomRepository>();
builder.Services.AddScoped<IPatientRepository, MySqlPatientRepository>();
builder.Services.AddScoped<ISymptomDefinitionRepository, MySqlSymptomDefinitionRepository>();
builder.Services.AddScoped<IMedicationRepository, MySqlMedicationRepository>();
builder.Services.AddScoped<IMedicalHistoryEntryRepository, MySqlMedicalHistoryEntryRepository>();
builder.Services.AddScoped<IFamilyHistoryEntryRepository, MySqlFamilyHistoryEntryRepository>();
builder.Services.AddScoped<ICommunicationLevelRepository, MySqlCommunicationLevelRepository>();
builder.Services.AddScoped<IDrugInteractionRepository, MySqlDrugInteractionRepository>();

builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<ISymptomService, SymptomService>();
builder.Services.AddScoped<IMedicationService, MedicationService>();
builder.Services.AddScoped<IMedicalHistoryEntryService, MedicalHistoryEntryService>();
builder.Services.AddScoped<IFamilyHistoryEntryService, FamilyHistoryEntryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAIService, AIService>();
builder.Services.AddScoped<IKnownMedicationRepository, MySqlKnownMedicationRepository>();
builder.Services.AddScoped<IKnownMedicationService, KnownMedicationService>();
builder.Services.AddScoped<IDiagnosisRepository, MySqlDiagnosisRepository>();
builder.Services.AddScoped<IDiagnosisService, DiagnosisService>();
builder.Services.AddScoped<IHealthTipService, HealthTipService>();
builder.Services.AddScoped<ICommunicationLevelService, CommunicationLevelService>();
builder.Services.AddSingleton<ITextTranslator, GTranslateTextTranslator>();
builder.Services.AddScoped<IDrugInteractionService, DrugInteractionService>();
builder.Services.AddScoped<ICheckupService, CheckupService>();

builder.Services.AddScoped<IMedicalLetterRepository, MySqlMedicalLetterRepository>();
builder.Services.AddScoped<IAnonymizerService, AnonymizerService>();

builder.Services.AddScoped<IEmergencyAccessRepository, MySqlEmergencyAccessRepository>();
builder.Services.AddScoped<IEmergencyAccessService, EmergencyAccessService>();
builder.Services.AddScoped<IEmergencyDataService, EmergencyDataService>();

builder.Services.AddTransient<DtoMapper>();

var connectionString = builder.Configuration.GetConnectionString("mySqlDb");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'mySqlDb' not found.");
}

builder.Services.AddDbContext<MySqlDbContext>(options => options.UseMySQL(connectionString));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.SignIn.RequireConfirmedAccount = false;

}).AddEntityFrameworkStores<MySqlDbContext>()
  .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
            builder.Configuration.GetSection("JwtSettings")["Secret"])
        ),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        RequireExpirationTime = false
    };
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<MySqlDbContext>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    await DbInitializer.Initialize(context, roleManager);
}

// Must run first, so everything after it sees the real client address
if (trustedProxies.Length > 0)
{
    app.UseForwardedHeaders();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
else
{
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseMiddleware<EmergencyHeadersMiddleware>();

app.UseCors("AllowAll");

app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

// Liefert die laufende Version (beim Release aus dem Git-Tag gesetzt).
app.MapGet("/api/version", () => new
{
    version = typeof(Program).Assembly
        .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?
        .InformationalVersion
});

app.MapControllers();

app.Run();

// Wird von den Integrationstests (WebApplicationFactory<Program>) benötigt
public partial class Program { }
