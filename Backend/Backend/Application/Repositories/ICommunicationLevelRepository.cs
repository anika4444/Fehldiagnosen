using Backend.Domain.Entities;

namespace Backend.Application.Repositories
{
    public interface ICommunicationLevelRepository
    {
        Task<CommunicationLevel?> FindByNameAsync(string name);
        Task<CommunicationLevel?> FindByPatientIdAsync(int patientId);
        Task<CommunicationLevel> AddAsync(CommunicationLevel communicationLevel);
        Task<IEnumerable<CommunicationLevel>> GetAllAsync();
    }
}