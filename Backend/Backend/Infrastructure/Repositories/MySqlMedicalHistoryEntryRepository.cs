using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlMedicalHistoryEntryRepository : IMedicalHistoryEntryRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlMedicalHistoryEntryRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<MedicalHistoryEntry> AddAsync(MedicalHistoryEntry entity)
        {
            _context.MedicalHistoryEntries.Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<MedicalHistoryEntry> DeleteAsync(MedicalHistoryEntry entity)
        {
            _context.MedicalHistoryEntries.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<List<MedicalHistoryEntry>> FindAllAsync()
        {
            return await _context.MedicalHistoryEntries.ToListAsync();
        }

        public async Task<IEnumerable<MedicalHistoryEntry>> FindAllByPatientIdAsync(int patientId)
        {
            return await _context.MedicalHistoryEntries
                .Where(m => m.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<MedicalHistoryEntry?> FindByIdAsync(int id)
        {
            return await _context.MedicalHistoryEntries.FindAsync(id);
        }

        public async Task<MedicalHistoryEntry> UpdateAsync(MedicalHistoryEntry entity)
        {
            _context.MedicalHistoryEntries.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }
    }
}
