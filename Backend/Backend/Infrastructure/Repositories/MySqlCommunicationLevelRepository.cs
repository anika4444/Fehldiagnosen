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

        public async Task<CommunicationLevel?> FindByNameAsync(string name)
        {
            return await _context.CommunicationLevels
                .FirstOrDefaultAsync(l => l.Name == name);
        }

        public async Task<IEnumerable<CommunicationLevel>> GetAllAsync()
        {
            return await _context.CommunicationLevels.ToListAsync();
        }

        public async Task<CommunicationLevel> AddAsync(CommunicationLevel communicationLevel)
        {
            _context.CommunicationLevels.Add(communicationLevel);
            await _context.SaveChangesAsync();
            return communicationLevel;
        }

        public async Task<CommunicationLevel?> FindByPatientIdAsync(int patientId)
        {
            var patient = await _context.Patients
                .Include(p => p.CommunicationLevel)
                .FirstOrDefaultAsync(p => p.Id == patientId);

            return patient?.CommunicationLevel;
        }
    }
}