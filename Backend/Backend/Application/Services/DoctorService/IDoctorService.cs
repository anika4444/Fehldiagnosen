using Backend.Application.Common.Results;
using Backend.Application.Services.DoctorService.Dto;

namespace Backend.Application.Services.DoctorService
{
    public interface IDoctorService
    {
        Task<ServiceResult<IEnumerable<DoctorResponse>>> GetAllAsync();
        Task<ServiceResult<DoctorResponse>> GetByIdAsync(int id);
        Task<ServiceResult<DoctorResponse>> CreateAsync(CreateDoctorRequest request, string userId, string userName);
        Task<ServiceResult<DoctorResponse>> UpdateAsync(int id, UpdateDoctorRequest request, string userId);
        Task<ServiceResult<bool>> DeleteAsync(int id, string userId);
    }
}