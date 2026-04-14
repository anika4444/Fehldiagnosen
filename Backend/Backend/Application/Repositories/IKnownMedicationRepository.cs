using Backend.Domain.Entities;
using Backend.Domain.Entities.Backend.Domain.Entities;

namespace Backend.Application.Repositories
{
    public interface IKnownMedicationRepository
    {
        Task<IEnumerable<KnownMedication>> SearchAsync(string query);
        Task RebuildFromCsvAsync(string csvPath);
    }
}