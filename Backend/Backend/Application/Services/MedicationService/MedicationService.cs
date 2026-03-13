using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicationService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicationService
{
    public class MedicationService : IMedicationService
    {
        private readonly IMedicationRepository _medicationRepository;
        private readonly IPatientRepository _patientRepository;
        private readonly DtoMapper _mapper;
        public MedicationService(IMedicationRepository medicationrepository,IPatientRepository patientRepository ,DtoMapper mapper)
        {
            _medicationRepository = medicationrepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
        }
        public async Task<MedicationResponse?> CreateMedication(int patientId, CreateMedicationRequest request)
        {
            Patient? patient = await _patientRepository.FindByIdAsync(patientId);
            if (patient == null) { return null; }
            var medication = new Medication()
            {
                Name = request.Name,
                PatientId = patientId,
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

        public async Task<IEnumerable<MedicationResponse>> GetMedicationsByPatientIdAsync(int patientId)
        {       
           var patientMedications = await _patientRepository.GetAllMedications(patientId);
            return patientMedications.Select(medication=> _mapper.ToMedicationResponse(medication));
        }

  
    }
}
