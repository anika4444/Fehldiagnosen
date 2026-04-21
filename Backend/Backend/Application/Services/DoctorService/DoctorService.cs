using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.DoctorService.Dto;

namespace Backend.Application.Services.DoctorService
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository;

        public DoctorService(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        public async Task<ServiceResult<IEnumerable<DoctorResponse>>> GetAllAsync()
        {
            var doctors = await _doctorRepository.FindAllAsync();
            return ServiceResult<IEnumerable<DoctorResponse>>.Success(
                doctors.Select(d => ToResponse(d))
            );
        }

        public async Task<ServiceResult<DoctorResponse>> GetByIdAsync(int id)
        {
            var doctor = await _doctorRepository.FindByIdAsync(id);
            if (doctor == null)
                return ServiceResult<DoctorResponse>.NotFound($"Arzt mit ID {id} nicht gefunden.");
            return ServiceResult<DoctorResponse>.Success(ToResponse(doctor));
        }

        public async Task<ServiceResult<DoctorResponse>> CreateAsync(CreateDoctorRequest request, string userId, string userName)
        {
            var doctor = new Domain.Entities.Doctor
            {
                UserId = userId,
                UserName = userName,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Specialization = request.Specialization,
                LicenseNumber = request.LicenseNumber
            };
            var created = await _doctorRepository.AddAsync(doctor);
            return ServiceResult<DoctorResponse>.Success(ToResponse(created));
        }

        public async Task<ServiceResult<DoctorResponse>> UpdateAsync(int id, UpdateDoctorRequest request, string userId)
        {
            var doctor = await _doctorRepository.FindByIdAsync(id);
            if (doctor == null)
                return ServiceResult<DoctorResponse>.NotFound($"Arzt mit ID {id} nicht gefunden.");
            if (doctor.UserId != userId)
                return ServiceResult<DoctorResponse>.Forbidden("Sie können nur Ihr eigenes Profil bearbeiten.");

            doctor.FirstName = request.FirstName;
            doctor.LastName = request.LastName;
            doctor.Specialization = request.Specialization;
            doctor.LicenseNumber = request.LicenseNumber;

            var updated = await _doctorRepository.UpdateAsync(doctor);
            return ServiceResult<DoctorResponse>.Success(ToResponse(updated));
        }

        public async Task<ServiceResult<bool>> DeleteAsync(int id, string userId)
        {
            var doctor = await _doctorRepository.FindByIdAsync(id);
            if (doctor == null)
                return ServiceResult<bool>.NotFound($"Arzt mit ID {id} nicht gefunden.");
            if (doctor.UserId != userId)
                return ServiceResult<bool>.Forbidden("Sie können nur Ihr eigenes Profil löschen.");

            await _doctorRepository.DeleteAsync(doctor);
            return ServiceResult<bool>.Success(true);
        }

        private DoctorResponse ToResponse(Domain.Entities.Doctor doctor)
        {
            return new DoctorResponse
            {
                Id = doctor.Id,
                UserId = doctor.UserId,
                UserName = doctor.UserName,
                FirstName = doctor.FirstName,
                LastName = doctor.LastName,
                Specialization = doctor.Specialization,
                LicenseNumber = doctor.LicenseNumber
            };
        }
    }
}