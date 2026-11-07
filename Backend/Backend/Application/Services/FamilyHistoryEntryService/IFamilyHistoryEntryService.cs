using Backend.Application.Common.Results;
using Backend.Application.Services.FamilyHistoryService.Dto;

namespace Backend.Application.Services.FamilyHistoryService
{
    public interface IFamilyHistoryEntryService
    {
        Task<ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>> GetAllAsync(int patientId, string? userId);

        Task<ServiceResult<FamilyHistoryEntryResponse>> GetByIdAsync(int familyHistoryEntryId, string? userId);

        Task<ServiceResult<FamilyHistoryEntryResponse>> CreateAsync(int patientId, CreateFamilyHistoryEntryRequest request, string? userId);

        Task<ServiceResult<FamilyHistoryEntryResponse>> UpdateAsync(int patientId, int familyHistoryEntryId, UpdateFamilyHistoryEntryRequest request, string? userId);

        Task<ServiceResult> DeleteAsync(int familyHistoryEntryId, string? userId);
    }
}