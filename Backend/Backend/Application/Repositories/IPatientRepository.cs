using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IPatientRepository
    {
        Task<Patient?> FindByIdAsync(int id);
        Task<Patient> UpdateAsync(Patient patient);
    }
}
