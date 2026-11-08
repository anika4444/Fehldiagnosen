using Backend.Application.Common.Results;
using Backend.Application.Services.DiagnosisService.Dto;
using Backend.Domain.Enums;

namespace Backend.Application.Services.DiagnosisService;

public interface IDiagnosisService
{
    Task<ServiceResult<DiagnosisResponse>> GetByIdAsync(int id, string? userId);
    Task<ServiceResult<IEnumerable<DiagnosisResponse>>> GetAllAsync(int patientId, string? userId);
    Task<ServiceResult<DiagnosisResponse>> CreateAsync(int patientId, CreateDiagnosisRequest request, EntryBy entryBy, string? userId);
    Task<ServiceResult<DiagnosisResponse>> UpdateAsync(int patientId, int id, UpdateDiagnosisRequest request, string? userId);
    Task<ServiceResult> DeleteAsync(int id, string? userId);
    Task<ServiceResult<DiagnosisResponse>> UpdateAiExplanation(int diagnosisId, string? aiExplanation);
}