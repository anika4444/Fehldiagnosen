using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlMedicationRepository : IMedicationRepository
    {
        private readonly MySqlDbContext _context;
        public MySqlMedicationRepository(MySqlDbContext context)
        {
            _context = context;
        }
        public async Task<Medication> AddAsync(Medication entity)
        {

            await _context.Medications.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Medication> DeleteAsync(Medication entity)
        {
            _context.Medications.Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<Medication>> FindAllAsync()
        {
            return await _context.Medications.ToListAsync();
            
        }

        public async Task<Medication?> FindByIdAsync(int id)
        {
            Medication? medication = await _context.Medications.FindAsync(id);
            return medication;
        }

        public async Task<List<Medication>> GetAllMedications(int patientId)
        {
            var patientMedication = await _context.Medications.Where(m => m.PatientId == patientId).ToListAsync();
            return patientMedication;
        }

        public async Task<Medication> UpdateAsync(Medication entity)
        {
            _context.Medications.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
