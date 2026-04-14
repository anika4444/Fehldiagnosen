using Backend.Application.Common.Results;

namespace Backend.Application.Services.AIService
{
    public interface IAIService
    {
        Task<ServiceResult<AiExplainResponse>> ExplainMedicalHistory(int id, string? userId, int medicalHistoryEntryId);
    }
}
