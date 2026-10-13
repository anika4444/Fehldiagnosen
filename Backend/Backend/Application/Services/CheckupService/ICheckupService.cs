using Backend.Application.Common.Results;
using Backend.Application.Services.CheckupService.Dto;

namespace Backend.Application.Services.CheckupService
{
    public interface ICheckupService
    {
        Task<ServiceResult<CheckupSummaryResponse>> GenerateCheckupSummary(int patientId, string? userId, CheckupSummaryRequest request);
    }
}