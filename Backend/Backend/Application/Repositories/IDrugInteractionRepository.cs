using Backend.Domain.Entities;

namespace Backend.Application.Repositories
{
    public interface IDrugInteractionRepository
    {
        Task<string?> GetDrugBankIdByAtcCodeAsync(string atcCode);

        Task<List<string>> GetDrugBankIdsByAtcCodesAsync(List<string> atcCode);
        Task<List<DrugInteraction>> GetInteractionsAsync(string newDrugBankId, List<string> existingDrugBankIds);
        Task RebuildFromXmlAsync(string csvPath);
        Task<List<DrugInteraction>> GetInteractionsAmongAsync(List<string> drugBankIds);
        Task<List<DrugDetail>> GetDrugDetailsAsync(List<string> drugBankIds);
    }
}
