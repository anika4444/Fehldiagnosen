using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IMedicationRepository: IRepository<Medication>
    {
        Task<IEnumerable<Medication>> FindAllByPatientIdAsync(int patientId);
    }
}
