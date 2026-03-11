using Backend.Application.Services.MedicationService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicationService
{
    public interface IMedicationService
    {
        Task<IEnumerable<MedicationResponse>> GetMedicationsByPatientIdAsync(int id);
        Task<MedicationResponse?> GetMedicationByIdAsync(int id);
        Task<MedicationResponse> CreateMedication(int patientId, CreateMedicationRequest request);
        Task UpdateMedication(int medicationId, int patientId);
        Task DeleteMedication(int medicationId);


    }
}
