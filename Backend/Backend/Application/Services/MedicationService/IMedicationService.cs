using Backend.Application.Common.Results;
using Backend.Application.Services.MedicationService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicationService
{
    public interface IMedicationService
    {
        Task<ServiceResult<IEnumerable<MedicationResponse>>> GetMedicationsByPatientIdAsync(int id);
        Task<ServiceResult<MedicationResponse>> GetMedicationByIdAsync(int id);
        Task<ServiceResult<MedicationResponse?>> CreateMedication(int patientId, CreateMedicationRequest request);
        Task<ServiceResult<MedicationResponse?>> UpdateMedication(int medicationId, CreateMedicationRequest request);
        Task<ServiceResult> DeleteMedication(int medicationId);
    }
}
