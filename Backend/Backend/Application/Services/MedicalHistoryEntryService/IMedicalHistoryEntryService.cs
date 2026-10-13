using Backend.Application.Common.Results;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;

namespace Backend.Application.Services.MedicalHistoryEntryService
{
    public interface IMedicalHistoryEntryService
    {
        Task<ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>> GetAllAsync(int patientId, string? userId);

        Task<ServiceResult<MedicalHistoryEntryResponse>> GetByIdAsync(int medicalHistoryEntryId, string? userId);

        Task<ServiceResult<MedicalHistoryEntryResponse>> CreateAsync(int patientId, CreateMedicalHistoryEntryRequest request, string? userId);

        Task<ServiceResult<MedicalHistoryEntryResponse>> UpdateAsync(int patientId, int medicalHistoryEntryId, UpdateMedicalHistoryEntryRequest request, string? userId);

        Task<ServiceResult> DeleteAsync(int medicalHistoryEntryId, string? userId);
    }
}