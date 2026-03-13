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

        public Task<Patient> AddAsync(Patient entity)
        {
            throw new NotImplementedException();
        }

        public Task<Patient> DeleteAsync(Patient entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Patient>> FindAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Patient?> FindByIdAsync(int id)
        {
            return await _context.Patients.FindAsync(id);
        }

        public Task<List<Medication>> GetAllMedications(int patientId)
        {
            throw new NotImplementedException();
        }

        public Task<Patient> UpdateAsync(Patient entity)
        {
            throw new NotImplementedException();
        }
    }
}
