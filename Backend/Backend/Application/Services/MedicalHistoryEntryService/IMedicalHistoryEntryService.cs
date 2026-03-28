using Backend.Application.Common.Results;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;

namespace Backend.Application.Services.MedicalHistoryEntryService
{
    public interface IMedicalHistoryEntryService
    {
        Task<ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>> GetAllAsync(int patientId);

        Task<ServiceResult<MedicalHistoryEntryResponse>> GetByIdAsync(int medicalHistoryEntryId);

        Task<ServiceResult<MedicalHistoryEntryResponse>> CreateAsync(int patientId, CreateMedicalHistoryEntryRequest request);

        Task<ServiceResult<MedicalHistoryEntryResponse>> UpdateAsync(int patientId, int medicalHistoryEntryId, UpdateMedicalHistoryEntryRequest request);

        Task<ServiceResult> DeleteAsync(int medicalHistoryId);
    }
}
