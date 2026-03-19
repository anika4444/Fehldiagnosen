using Backend.Application.Services.FamilyHistoryService.Dto;

namespace Backend.Application.Services.FamilyHistoryService
{
    public interface IFamilyHistoryService
    {
        Task<IEnumerable<FamilyHistoryEntryResponse>> GetAllByPatientIdAsync(int patientId);
        Task<FamilyHistoryEntryResponse> GetByIdAsync(int historyEntryId);
        Task<FamilyHistoryEntryResponse> CreateAsync(int patientId, CreateFamilyHistoryEntryRequest request);
        Task<FamilyHistoryEntryResponse> UpdateAsync(int patientId, int historyEntryId, UpdateFamilyHistoryEntryRequest request);
        Task<FamilyHistoryEntryResponse> DeleteAsync(int historyEntryId);
    }
}