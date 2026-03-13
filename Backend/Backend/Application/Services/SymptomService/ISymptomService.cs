using Backend.Application.Common.Results;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.SymptomService
{
    public interface ISymptomService
    {
        Task<ServiceResult<PatientSymptomResponse>> GetById(int symptomId);
        Task<ServiceResult<IEnumerable<SymptomDefinitionResponse>>> GetSymptomDefinitionsByNameAsync(string name);
        Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetPatientSymptomsAsync(int patientId);
        Task<ServiceResult<PatientSymptomResponse>> CreatePatientSymptomAsync(int patientId, CreatePatientSymptomRequest request);
        Task<ServiceResult<PatientSymptomResponse>> UpdatePatientSymptomAsync(int patiendId, int patientSymptomId, UpdatePatientSymptomRequest request);
        Task<ServiceResult> DeletePatientSymptomAsync(int symptomId);
        Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetPatientSymptomsByDateAsync(int patientId, DateTime date);
    }
}
