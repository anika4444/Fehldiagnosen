using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IPatientSymptomRepository : IRepository<PatientSymptom>
    {
        Task<IEnumerable<PatientSymptom>> GetByPatientIdAsync(int patientId);
    }
}
