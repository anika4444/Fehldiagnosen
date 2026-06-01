using Backend.Application.Common.Results;
using Backend.Application.Services.DiagnosisService.Dto;

namespace Backend.Application.Services.DiagnosisService;

public interface IDiagnosisService
{
    Task<ServiceResult<DiagnosisResponse>> GetByIdAsync(int id, string? userId);
    Task<ServiceResult<IEnumerable<DiagnosisResponse>>> GetByPatientIdAsync(int patientId, string? userId);
    Task<ServiceResult<DiagnosisResponse>> CreateAsync(CreateDiagnosisRequest request, string? userId);
    Task<ServiceResult<DiagnosisResponse>> UpdateAsync(int id, UpdateDiagnosisRequest request, string? userId);
    Task<ServiceResult> DeleteAsync(int id, string? userId);
}