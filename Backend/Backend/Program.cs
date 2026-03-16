using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService;
<<<<<<< HEAD
using Backend.Application.Services.MedicalHistoryService;
=======
>>>>>>> bda72a0f68944dfa9b8033b17ce8cfb1b8104a1d
using Backend.Application.Services.MedicationService;
using Backend.Application.Services.SymptomService;
using Backend.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
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
<<<<<<< HEAD
//builder.Services.AddScoped<IMedicationService, MedicationService>();

=======
builder.Services.AddScoped<IMedicalHistoryEntryService, MedicalHistoryEntryService>();
builder.Services.AddScoped<IMedicalHistoryEntryRepository, MySqlMedicalHistoryRepository>();
builder.Services.AddScoped<IFamilyHistoryRepository, MySqlFamilyHistoryRepository>();
>>>>>>> bda72a0f68944dfa9b8033b17ce8cfb1b8104a1d

builder.Services.AddTransient<DtoMapper>();

var connectionString = builder.Configuration.GetConnectionString("mySqlDb");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'mySqlDb' not found.");
}

builder.Services.AddDbContext<MySqlDbContext>(options => options.UseMySQL(connectionString));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<MySqlDbContext>();
    DbInitializer.Initialize(context);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
