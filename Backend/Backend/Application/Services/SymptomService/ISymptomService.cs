using Backend.Application.Common.Results;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.SymptomService
{
    public interface ISymptomService
    {
        Task<ServiceResult<PatientSymptomResponse>> GetByIdAsync(int symptomId, string? userId);
        
        Task<ServiceResult<IEnumerable<SymptomDefinitionResponse>>> GetSymptomDefinitionsByNameAsync(string? name);
        
        Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetAllAsync(int patientId, string? userId);
        
        Task<ServiceResult<PatientSymptomResponse>> CreateAsync(int patientId, CreatePatientSymptomRequest request, string? userId);
        
        Task<ServiceResult<PatientSymptomResponse>> UpdateAsync(int patientId, int patientSymptomId, UpdatePatientSymptomRequest request, string? userId);
        
        Task<ServiceResult> DeleteAsync(int symptomId, string? userId);
        
        Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetAllByDateAsync(int patientId, DateTime date, string? userId);
    }
}
