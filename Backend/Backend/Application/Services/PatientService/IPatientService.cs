using Backend.Domain.Entities;

namespace Backend.Application.Services.PatientService
{
    public interface IPatientService
    {
            Task<Patient> GetPatientByIdAsync(int id);
    }
}
