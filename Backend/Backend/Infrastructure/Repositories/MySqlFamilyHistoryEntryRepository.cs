using Backend.Domain.Entities;
using Backend.Application.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlFamilyHistoryEntryRepository : IFamilyHistoryEntryRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlFamilyHistoryEntryRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<List<FamilyHistoryEntry>> FindAllAsync()
        {
            return await _context.FamilyHistoryEntries.ToListAsync();
        }

        public async Task<FamilyHistoryEntry?> FindByIdAsync(int id)
        {
            return await _context.FamilyHistoryEntries.FindAsync(id);
        }
        
        public async Task<IEnumerable<FamilyHistoryEntry>> FindAllByPatientIdAsync(int patientId)
        {
            return await _context.FamilyHistoryEntries
                .Where(e => e.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<FamilyHistoryEntry> AddAsync(FamilyHistoryEntry entity)
        {
            await _context.FamilyHistoryEntries.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<FamilyHistoryEntry> UpdateAsync(FamilyHistoryEntry entity)
        {
            _context.FamilyHistoryEntries.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<FamilyHistoryEntry> DeleteAsync(FamilyHistoryEntry entity)
        {
            _context.FamilyHistoryEntries.Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
   
      }
}

