using Backend.Application.Repositories;
using Backend.Domain.Entities;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlPatientRepository : IPatientRepository
    {
        private readonly MySqlDbContext _context;
        
        public MySqlPatientRepository(MySqlDbContext context)
        {
            _context = context;
        }
        
        public async Task<Patient?> FindByIdAsync(int id)
        {
            return await _context.Patients.FindAsync(id);
        }

        public async Task<Patient> UpdateAsync(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
            return patient;
        }
    }
}
