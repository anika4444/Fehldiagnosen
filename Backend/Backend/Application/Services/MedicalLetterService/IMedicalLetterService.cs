using Backend.Application.Common;
using Backend.Application.Services.MedicalLetterService.Dto;
using Backend.Application.Common.Results;

namespace Backend.Application.Interfaces
{
    public interface IMedicalLetterService
    {
        Task<ServiceResult<MedicalLetterResponse>> GetByIdAsync(int id, string? userId);
        Task<ServiceResult<IEnumerable<MedicalLetterResponse>>> GetByPatientIdAsync(int patientId, string? userId);
        Task<ServiceResult<MedicalLetterResponse>> CreateAsync(CreateMedicalLetterRequest request, string? userId);
        Task<ServiceResult<MedicalLetterResponse>> UpdateAsync(int id, CreateMedicalLetterRequest request, string? userId);
        Task<ServiceResult> DeleteAsync(int id, string? userId);      
    }
}