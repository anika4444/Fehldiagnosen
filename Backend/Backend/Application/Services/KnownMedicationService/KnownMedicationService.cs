using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Backend.Domain.Entities.Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class KnownMedicationService : IKnownMedicationService
    {
        private readonly IKnownMedicationRepository _repository;

        public KnownMedicationService(IKnownMedicationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<KnownMedication>> SearchAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query) || query.Length < 2)
                return new List<KnownMedication>();

            return await _repository.SearchAsync(query);
        }

        public async Task RebuildFromCsvAsync(string csvPath)
        {
            await _repository.RebuildFromCsvAsync(csvPath);
        }
    }
}