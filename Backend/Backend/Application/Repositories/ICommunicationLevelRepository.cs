using Backend.Domain.Entities;

namespace Backend.Application.Repositories
{
    public interface ICommunicationLevelRepository
    {
        Task<CommunicationLevel?> FindByPatientIdAsync(int patientId);
        Task<CommunicationLevel> AddAsync(CommunicationLevel communicationLevel);
        Task<CommunicationLevel> UpdateAsync(CommunicationLevel communicationLevel);
    }
}