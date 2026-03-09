using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.SymptomService
{
    public interface ISymptomService
    {
        Task<IEnumerable<SymptomDefinition>> GetSymptomDefinitionsByNameAsync(string name);
        Task<IEnumerable<PatientSymptomResponse>> GetPatientSymptomsAsync(int patientId);
         Task<PatientSymptomResponse> CreatePatientSymptomAsync(CreatePatientSymptomRequest request);
         Task<PatientSymptom> UpdatePatientSymptomAsync(PatientSymptom symptom);
         Task<bool> DeletePatientSymptomAsync(int symptomId);
    }
}
