using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicationService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicationService
{
    public class MedicationService : IMedicationService
    {
        private readonly IMedicationrepository _medicationRepository;
        private readonly DtoMapper _mapper;
        public MedicationService(IMedicationrepository medicationrepository,DtoMapper mapper)
        {
            _medicationRepository = medicationrepository;
            _mapper = mapper;
        }
        public async Task<MedicationResponse> CreateMedication(int patientId, CreateMedicationRequest request)
        {
            var medication = new Medication()
            {
                Name = request.Name,
                Id = request.Id,

            };
            Medication newMedication = await _medicationRepository.AddAsync(medication);

            return _mapper.ToMedicationResponse(newMedication);
        }

        public async Task DeleteMedication(int medicationId)
        {
            Medication? medication = await _medicationRepository.FindByIdAsync(medicationId);
            if (medication == null) return;

              await _medicationRepository.DeleteAsync(medication);
            
        }

        public async Task<MedicationResponse?> GetMedicationByIdAsync(int id)
        {
            var medication = await _medicationRepository.FindByIdAsync(id);
            if (medication == null)
                return null;

            return _mapper.ToMedicationResponse(medication);
        }

        public Task<IEnumerable<MedicationResponse>> GetMedicationsByPatientIdAsync(int patientId)
        {
            throw new NotImplementedException(); // PatientReporequired
        }

        public Task UpdateMedication(int medicationId, int patientId)
        {
            throw new NotImplementedException(); // PatientReporequired
        }
    }
}
