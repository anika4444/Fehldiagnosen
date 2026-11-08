using Backend.Application.Common.Results;
using Backend.Application.Services.CommunicationLevelService.Dto;

namespace Backend.Application.Services.CommunicationLevelService
{
    public interface ICommunicationLevelService
    {
        Task<ServiceResult<IEnumerable<CommunicationQuestionResponse>>> GetQuestionsAsync();
        Task<ServiceResult<CommunicationLevelResponse>> CreateAsync(int patientId, CreateCommunicationLevelRequest request, string userId);
        Task<ServiceResult<CommunicationLevelResponse>> GetByPatientIdAsync(int patientId, string userId);
    }
}