using Backend.Application.Common.Results;
using Backend.Application.Services.MedicationService.Dto;

namespace Backend.Application.Services.MedicationService
{
    public interface IMedicationService
    {
        Task<ServiceResult<IEnumerable<MedicationResponse>>> GetAllAsync(int patientId);
        
        Task<ServiceResult<MedicationResponse>> GetByIdAsync(int medicationId);
        
        Task<ServiceResult<MedicationResponse>> CreateAsync(int patientId, CreateMedicationRequest request);
        
        Task<ServiceResult<MedicationResponse>> UpdateAsync(int patientId, int medicationId, UpdateMedicationRequest request);
        
        Task<ServiceResult> DeleteAsync(int medicationId);
    }
}