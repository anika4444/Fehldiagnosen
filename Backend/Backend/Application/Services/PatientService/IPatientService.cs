using Backend.Application.Common.Results;
using Backend.Application.Services.PatientService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.PatientService
{
    public interface IPatientService
    {
        Task<ServiceResult<PatientResponse>> GetPatientByIdAsync(int id);
    }
}
