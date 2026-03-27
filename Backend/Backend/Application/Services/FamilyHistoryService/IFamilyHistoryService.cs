using Backend.Application.Common.Results;
using Backend.Application.Services.FamilyHistoryService.Dto;

namespace Backend.Application.Services.FamilyHistoryService
{
    public interface IFamilyHistoryService
    {
        Task<ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>> GetAllByPatientIdAsync(int patientId);
        Task<ServiceResult<FamilyHistoryEntryResponse>> GetByIdAsync(int historyEntryId);
        Task<ServiceResult<FamilyHistoryEntryResponse>> CreateAsync(int patientId, CreateFamilyHistoryEntryRequest request);
        Task<ServiceResult<FamilyHistoryEntryResponse>> UpdateAsync(int patientId, int historyEntryId, UpdateFamilyHistoryEntryRequest request);
        Task<ServiceResult<FamilyHistoryEntryResponse>> DeleteAsync(int historyEntryId);
    }
}