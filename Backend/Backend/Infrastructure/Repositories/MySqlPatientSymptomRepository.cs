using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlPatientSymptomRepository : IPatientSymptomRepository
    {
        private readonly MySqlDbContext _context;
        public MySqlPatientSymptomRepository(MySqlDbContext context)
        {
            _context = context;
        }
        public async Task<PatientSymptom> AddAsync(PatientSymptom entity)
        {
            await _context.PatientSymptoms.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<PatientSymptom> DeleteAsync(PatientSymptom entity)
        {
            _context.PatientSymptoms.Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<PatientSymptom>> FindAllAsync()
        {
            return await _context.PatientSymptoms.ToListAsync();
        }

        public async Task<PatientSymptom?> FindByIdAsync(int id)
        {
            return await _context.PatientSymptoms.FindAsync(id);
        }

        public async Task<IEnumerable<PatientSymptom>> GetByPatientIdAndDateAsync(int patientId, DateTime date)
        {
            return await _context.PatientSymptoms
                .Where(ps => ps.PatientId == patientId && ps.OccurrenceTime.Date == date.Date)
                .ToListAsync();
        }

        public async Task<IEnumerable<PatientSymptom>> GetByPatientIdAsync(int patientId)
        {
            return await _context.PatientSymptoms
                .Include(ps => ps.SymptomDefinition) // Include related SymptomDefinition
                .Where(ps => ps.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<PatientSymptom> UpdateAsync(PatientSymptom entity)
        {
            _context.PatientSymptoms.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
