using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IFamilyHistoryEntryRepository : IRepository<FamilyHistoryEntry>
    {
        Task<IEnumerable<FamilyHistoryEntry>> FindAllByPatientIdAsync(int patientId);
    }
}