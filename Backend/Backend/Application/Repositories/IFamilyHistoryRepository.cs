using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IFamilyHistoryRepository : IRepository<FamilyHistoryEntry>
    {
        Task<List<FamilyHistoryEntry>> FindByPatientIdAsync(int patientId);
    }
}