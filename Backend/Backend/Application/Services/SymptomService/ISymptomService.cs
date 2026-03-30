using Backend.Application.Common.Results;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.SymptomService
{
    public interface ISymptomService
    {
        Task<ServiceResult<PatientSymptomResponse>> GetByIdAsync(int symptomId);
        
        Task<ServiceResult<IEnumerable<SymptomDefinitionResponse>>> GetSymptomDefinitionsByNameAsync(string name);
        
        Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetAllAsync(int patientId);
        
        Task<ServiceResult<PatientSymptomResponse>> CreateAsync(int patientId, CreatePatientSymptomRequest request);
        
        Task<ServiceResult<PatientSymptomResponse>> UpdateAsync(int patiendId, int patientSymptomId, UpdatePatientSymptomRequest request);
        
        Task<ServiceResult> DeleteAsync(int symptomId);
        
        Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetAllByDateAsync(int patientId, DateTime date);
    }
}
