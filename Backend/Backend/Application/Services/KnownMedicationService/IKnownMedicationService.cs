using Backend.Domain.Entities;
using Backend.Domain.Entities.Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public interface IKnownMedicationService
    {
        Task<IEnumerable<KnownMedication>> SearchAsync(string query);
        Task RebuildFromCsvAsync(string csvPath);
    }
}