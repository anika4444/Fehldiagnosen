using Backend.Application.Common.Results;
using Backend.Application.Services.DrugInteractionService.Dto;

namespace Backend.Application.Services.DrugInteractionService
{
    public interface IDrugInteractionService
    {
        Task<ServiceResult<List<string>>> CheckInteractionsAsync(string newAtcCode, List<string> existingAtcCodes);
        Task<ServiceResult<bool>> ImportDrugDataAsync(string xmlFilePath);
        Task<ServiceResult<InteractionCheckResultDto>> GetInteractionPairsAsync(List<MedicationAtcDto> medications);
    }
}
