using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Backend.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlMedicalLetterRepository : IMedicalLetterRepository
    {
        private MySqlDbContext _context;
        public MySqlMedicalLetterRepository(MySqlDbContext context)
        {
            _context = context;
        }
        public async Task<MedicalLetter> AddAsync(MedicalLetter entity)
        {
            var newMedicalLetter = await _context.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<MedicalLetter> DeleteAsync(MedicalLetter entity)
        {
             _context.Remove(entity);
            await _context.SaveChangesAsync();
            return  entity;
        }

        public async Task<List<MedicalLetter>> FindAllAsync()
        {
            var allLetters =  await _context.MedicalLetters.ToListAsync();
            return allLetters;
        }

        public async Task<MedicalLetter?> FindByIdAsync(int id)
        {
            var foundLetter = await _context.MedicalLetters.FindAsync(id);
            return foundLetter;
           
        }

        public async Task<MedicalLetter> UpdateAsync(MedicalLetter entity)
        {
            var updatetLetter =  _context.MedicalLetters.Update(entity);
            await _context.SaveChangesAsync();
            return  entity;
        }
    }
}


