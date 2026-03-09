using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlSymptomDefinitionRepository : ISymptomDefinitionRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlSymptomDefinitionRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<SymptomDefinition> AddAsync(SymptomDefinition entity)
        {
            await _context.SymptomsDefinition.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<SymptomDefinition> DeleteAsync(SymptomDefinition entity)
        {
            _context.SymptomsDefinition.Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<List<SymptomDefinition>> FindAllAsync()
        {
            return await _context.SymptomsDefinition.ToListAsync();
        }

        public async Task<SymptomDefinition?> FindByIdAsync(int id)
        {
            return await _context.SymptomsDefinition.FindAsync(id);
        }

        public async Task<IEnumerable<SymptomDefinition>> SearchByNameAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return await _context.SymptomsDefinition.ToListAsync();

            return await _context.SymptomsDefinition
                .Where(s => s.Name.Contains(name))
                .OrderBy(s => s.Name)
                .ToListAsync();
        }

        public async Task<SymptomDefinition> UpdateAsync(SymptomDefinition entity)
        {
            _context.SymptomsDefinition.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
