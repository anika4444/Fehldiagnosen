using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IDiagnosisRepository : IRepository<Diagnosis>
    {
        Task<IEnumerable<Diagnosis>> FindAllByPatientIdAsync(int patientId);

        Task<IEnumerable<Diagnosis>> FindAllByPatientIdAndDateRangeAsync(int patientId, DateTime from, DateTime to);
    }
}