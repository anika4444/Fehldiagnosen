using Backend.Application.Common.Results;

namespace Backend.Application.Services.DrugInteractionService
{
    public interface IDrugInteractionService
    {
        Task<ServiceResult<List<string>>> CheckInteractionsAsync(string newAtcCode, List<string> existingAtcCodes);
        Task<ServiceResult<bool>> ImportDrugDataAsync(string xmlFilePath);
    }
}
