using Backend.Application.Common.Results;
using Backend.Application.Services.AIService.Dto;

namespace Backend.Application.Services.AIService
{
    public interface IAIService
    {
        Task<ServiceResult<AiExplainResponse>> ExplainMedicalHistory(int id, string? userId, int medicalHistoryEntryId);
        Task<ServiceResult<CheckupSummaryResponse>> GenerateCheckupSummary(int patientId, string? userId, CheckupSummaryRequest request);
    }
}

