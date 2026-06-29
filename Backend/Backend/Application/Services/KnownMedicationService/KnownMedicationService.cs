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

        public async Task<KnownMedication?> IdentifyAsync(string? brand, string? productName, string? activeIngredient, string? dosage, string? form)
        {
            if (string.IsNullOrWhiteSpace(brand) &&
                string.IsNullOrWhiteSpace(activeIngredient) &&
                string.IsNullOrWhiteSpace(dosage))
            {
                return null;
            }

            Console.WriteLine($"AI-Extraktion → brand: {brand}, productName: {productName}, activeIngredient: {activeIngredient}, dosage: {dosage}, form: {form}");

            var candidates = await _repository.IdentifyAsync(brand, productName, activeIngredient, dosage, form);

            Console.WriteLine($"Treffer: {candidates.Count()}");

            return candidates.FirstOrDefault();
        }
    }
}