using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Domain.Entities;

namespace Backend.Application.Common.Access
{
    public static class PatientAccessExtensions
    {
        public static async Task<ServiceResult<Patient>> EnsureAccessAsync(this IPatientRepository patientRepository, int patientId, string? userId)
        {
            var patient = await patientRepository.FindByIdAsync(patientId);

            if (patient == null)
            {
                return ServiceResult<Patient>.NotFound($"Patient {patientId} existiert nicht.");
            }

            if (userId != null && patient.UserId != userId)
            {
                return ServiceResult<Patient>.Forbidden("Kein Zugriff auf diesen Patienten.");
            }

            return ServiceResult<Patient>.Success(patient);
        }
    }
}
