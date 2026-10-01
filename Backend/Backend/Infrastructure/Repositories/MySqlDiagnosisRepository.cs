using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlDiagnosisRepository : IDiagnosisRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlDiagnosisRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<Diagnosis> AddAsync(Diagnosis entity)
        {
            await _context.Diagnoses.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Diagnosis> DeleteAsync(Diagnosis entity)
        {
            _context.Diagnoses.Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<Diagnosis>> FindAllAsync()
        {
            return await _context.Diagnoses.ToListAsync();
        }

        public async Task<Diagnosis?> FindByIdAsync(int id)
        {
            return await _context.Diagnoses.FindAsync(id);
        }

        public async Task<IEnumerable<Diagnosis>> FindAllByPatientIdAsync(int patientId)
        {
            return await _context.Diagnoses
                .Where(d => d.PatientId == patientId)
                .ToListAsync();
        }

        public async Task<Diagnosis> UpdateAsync(Diagnosis entity)
        {
            _context.Diagnoses.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}