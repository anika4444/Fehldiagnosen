using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Backend.Domain.Entities.Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public class KnownMedicationService : IKnownMedicationService
    {
        private readonly IKnownMedicationRepository _repository;
        private readonly ILogger<KnownMedicationService> _logger;

        public KnownMedicationService(IKnownMedicationRepository repository, ILogger<KnownMedicationService> logger)
        {
            _repository = repository;
            _logger = logger;
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

        public async Task<KnownMedication?> IdentifyAsync(string? brand, string? productName, string? activeIngredient, string? dosage, string? form)
        {
            if (string.IsNullOrWhiteSpace(brand) &&
                string.IsNullOrWhiteSpace(activeIngredient) &&
                string.IsNullOrWhiteSpace(dosage))
            {
                return null;
            }

            var candidates = await _repository.IdentifyAsync(brand, productName, activeIngredient, dosage, form);

            _logger.LogDebug("Medikamentenabgleich: {CandidateCount} Treffer", candidates.Count());

            return candidates.FirstOrDefault();
        }
    }
}