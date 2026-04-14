using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlCommunicationLevelRepository : ICommunicationLevelRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlCommunicationLevelRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<CommunicationLevel?> FindByPatientIdAsync(int patientId)
        {
            return await _context.CommunicationLevels
                .FirstOrDefaultAsync(c => c.PatientId == patientId);
        }

        public async Task<CommunicationLevel> AddAsync(CommunicationLevel communicationLevel)
        {
            _context.CommunicationLevels.Add(communicationLevel);
            await _context.SaveChangesAsync();
            return communicationLevel;
        }

        public async Task<CommunicationLevel> UpdateAsync(CommunicationLevel communicationLevel)
        {
            _context.CommunicationLevels.Update(communicationLevel);
            await _context.SaveChangesAsync();
            return communicationLevel;
        }
    }
}