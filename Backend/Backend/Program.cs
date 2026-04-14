using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services;
using Backend.Application.Services.DiagnosisService;
using Backend.Application.Services.FamilyHistoryService;
using Backend.Application.Services.HealthTipService;
using Backend.Application.Services.MedicalHistoryEntryService;
using Backend.Application.Services.MedicationNotification;
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
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IPatientSymptomRepository, MySqlSymptomRepository>();
builder.Services.AddScoped<IPatientRepository, MySqlPatientRepository>();
builder.Services.AddScoped<ISymptomDefinitionRepository, MySqlSymptomDefinitionRepository>();
builder.Services.AddScoped<IMedicationRepository, MySqlMedicationRepository>();
builder.Services.AddScoped<IMedicalHistoryEntryRepository, MySqlMedicalHistoryEntryRepository>();
builder.Services.AddScoped<IFamilyHistoryEntryRepository, MySqlFamilyHistoryEntryRepository>();

builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<ISymptomService, SymptomService>();
builder.Services.AddScoped<IMedicationService, MedicationService>();
builder.Services.AddScoped<IMedicalHistoryEntryService, MedicalHistoryEntryService>();
builder.Services.AddScoped<IFamilyHistoryEntryService, FamilyHistoryEntryService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMedicationNotificationService, MedicationNotificationService>();
builder.Services.AddScoped<IKnownMedicationRepository, MySqlKnownMedicationRepository>();
builder.Services.AddScoped<IKnownMedicationService, KnownMedicationService>();
builder.Services.AddScoped<IDiagnosisRepository, MySqlDiagnosisRepository>();
builder.Services.AddScoped<IDiagnosisService, DiagnosisService>();
builder.Services.AddScoped<IHealthTipService, HealthTipService>();

builder.Services.AddSignalR();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.MapHub<MedicationHub>("/hubs/medication");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
