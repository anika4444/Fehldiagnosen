using Backend.Domain.Entities.Backend.Domain.Entities;

namespace Backend.Application.Services
{
    public interface IKnownMedicationService
    {
        Task<IEnumerable<KnownMedication>> SearchAsync(string query);

        Task RebuildFromCsvAsync(string csvPath);

        Task<KnownMedication?> IdentifyAsync(string? brand, string? productName, string? activeIngredient, string? dosage, string? form);
    }
}