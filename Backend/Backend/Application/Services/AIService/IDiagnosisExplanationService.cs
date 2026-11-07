using Backend.Application.Common.Results;
using Backend.Application.Services.AIService.Dto;

namespace Backend.Application.Services.AIService
{
    public interface IDiagnosisExplanationService
    {
        Task<ServiceResult<AiExplainResponse>> ExplainDiagnosis(int id, string? userId, int diagnosisId);
    }
}
