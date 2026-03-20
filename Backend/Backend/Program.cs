using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService;
using Backend.Application.Services.MedicationService;
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
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IPatientSymptomRepository, MySqlPatientSymptomRepository>();
builder.Services.AddScoped<IPatientRepository, MySqlPatientRepository>();
builder.Services.AddScoped<ISymptomDefinitionRepository, MySqlSymptomDefinitionRepository>();

builder.Services.AddScoped<ISymptomService, SymptomService>();
//builder.Services.AddScoped<IMedicationService, MedicationService>();

builder.Services.AddScoped<IMedicalHistoryEntryService, MedicalHistoryEntryService>();
builder.Services.AddScoped<IMedicalHistoryEntryRepository, MySqlMedicalHistoryRepository>();
builder.Services.AddScoped<IFamilyHistoryRepository, MySqlFamilyHistoryRepository>();
builder.Services.AddScoped<IUserService, UserService>();

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


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
