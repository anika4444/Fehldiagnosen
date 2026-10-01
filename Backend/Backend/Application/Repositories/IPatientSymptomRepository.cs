using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IPatientSymptomRepository : IRepository<PatientSymptom>
    {
        Task<IEnumerable<PatientSymptom>> FindAllByPatientIdAsync(int patientId);
        
        Task<IEnumerable<PatientSymptom>> FindAllByPatientIdAndDateAsync(int symptomDefinitionId, DateTime date);
    }
}
