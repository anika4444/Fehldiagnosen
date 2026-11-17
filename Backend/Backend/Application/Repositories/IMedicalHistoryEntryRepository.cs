using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IMedicalHistoryEntryRepository : IRepository<MedicalHistoryEntry>
    {
        Task<IEnumerable<MedicalHistoryEntry>> FindAllByPatientIdAsync(int patientId);
    }
}
