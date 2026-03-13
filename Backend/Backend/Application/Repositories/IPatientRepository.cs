using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface IPatientRepository: IRepository<Patient>
    {
        Task<List<Medication>> GetAllMedications(int patientId);
    }
}
