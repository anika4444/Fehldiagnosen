using Backend.Application.Common.Results;
using Backend.Application.Services.FamilyHistoryService.Dto;

namespace Backend.Application.Services.FamilyHistoryService
{
    public interface IFamilyHistoryEntryService
    {
        Task<ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>> GetAllAsync(int patientId);
        
        Task<ServiceResult<FamilyHistoryEntryResponse>> GetByIdAsync(int familyHistoryEntryId);
        
        Task<ServiceResult<FamilyHistoryEntryResponse>> CreateAsync(int patientId, CreateFamilyHistoryEntryRequest request);
        
        Task<ServiceResult<FamilyHistoryEntryResponse>> UpdateAsync(int patientId, int familyHistoryEntryId, UpdateFamilyHistoryEntryRequest request);
        
        Task<ServiceResult> DeleteAsync(int familyHistoryEntryId);
    }
}