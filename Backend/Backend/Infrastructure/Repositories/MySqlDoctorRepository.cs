using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlDoctorRepository : IDoctorRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlDoctorRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<List<Doctor>> FindAllAsync()
        {
            return await _context.Doctors.ToListAsync();
        }

        public async Task<Doctor?> FindByIdAsync(int id)
        {
            return await _context.Doctors.FindAsync(id);
        }

        public async Task<Doctor?> FindByUserIdAsync(string userId)
        {
            return await _context.Doctors.FirstOrDefaultAsync(d => d.UserId == userId);
        }

        public async Task<Doctor> AddAsync(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<Doctor> UpdateAsync(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }

        public async Task<Doctor> DeleteAsync(Doctor doctor)
        {
            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return doctor;
        }
    }
}