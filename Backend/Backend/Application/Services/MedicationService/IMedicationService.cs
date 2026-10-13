using Backend.Application.Common.Results;
using Backend.Application.Services.MedicationService.Dto;

namespace Backend.Application.Services.MedicationService
{
    public interface IMedicationService
    {
        Task<ServiceResult<IEnumerable<MedicationResponse>>> GetAllAsync(int patientId, string? userId);
        
        Task<ServiceResult<MedicationResponse>> GetByIdAsync(int medicationId, string? userId);
        
        Task<ServiceResult<MedicationResponse>> CreateAsync(int patientId, CreateMedicationRequest request, string? userId);
        
        Task<ServiceResult<MedicationResponse>> UpdateAsync(int patientId, int medicationId, UpdateMedicationRequest request, string? userId);
        
        Task<ServiceResult> DeleteAsync(int medicationId, string? userId);
    }
}