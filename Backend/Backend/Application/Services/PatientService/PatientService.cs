using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.PatientService.Dto;

namespace Backend.Application.Services.PatientService
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;

        public PatientService(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        public async Task<ServiceResult<PatientResponse>> GetPatientByIdAsync(int id)
        {
            var patient = await _patientRepository.FindByIdAsync(id);
            if (patient == null)
                return ServiceResult<PatientResponse>.NotFound($"Patient {id} nicht gefunden");

            return ServiceResult<PatientResponse>.Success(new PatientResponse
            {
                Id = patient.Id,
                UserName = patient.UserName,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                DateOfBirth = patient.DateOfBirth,
                Gender = patient.Gender
            });
        }
    }
}