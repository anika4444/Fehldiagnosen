using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IDiagnosisRepository : IRepository<Diagnosis>
    {
        Task<IEnumerable<Diagnosis>> FindAllByPatientIdAsync(int patientId);
    }
}