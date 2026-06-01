using Backend.Application.Common.Results;

namespace Backend.Application.Services.AIService
{
    public interface IAIService
    {
        Task<ServiceResult<AiExplainResponse>> ExplainDiagnosis(int id, string? userId, int diagnosisId);
    }
}
