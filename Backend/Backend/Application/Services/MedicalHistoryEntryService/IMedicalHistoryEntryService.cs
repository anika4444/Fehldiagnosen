using Backend.Application.Services.MedicalHistoryEntryService.Dto;

namespace Backend.Application.Services.MedicalHistoryService
{
    public interface IMedicalHistoryEntryService
    {
        Task<IEnumerable<MedicalHistoryEntryResponse>> GetAllAsync(int patientId);

        Task<MedicalHistoryEntryResponse> GetByIdAsync(int medicalHistoryEntryId);

        Task<MedicalHistoryEntryResponse> CreateAsync(int patientId, CreateMedicalHistoryEntryRequest request);

        Task<MedicalHistoryEntryResponse> UpdateAsync(int medicalHistoryEntryId, UpdateMedicalHistoryEntryRequest request);

        Task<MedicalHistoryEntryResponse> DeleteAsync(int medicalHistoryId);
    }
}
