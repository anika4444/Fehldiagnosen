using Backend.Application.Common.Results;
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
        public async Task<ServiceResult<MedicationResponse?>> CreateMedication(int patientId, CreateMedicationRequest request)
        {
            Patient? patient = await _patientRepository.FindByIdAsync(patientId);
            if (patient == null) 
            { return ServiceResult<MedicationResponse?>.NotFound("Patient existiert nicht"); }
            var medication = new Medication()
            {
                Name = request.Name,
                PatientId = patientId,
            };
            
            Medication newMedication = await _medicationRepository.AddAsync(medication);
            return ServiceResult<MedicationResponse?>.Success(_mapper.ToMedicationResponse(newMedication));   
        }

        public async Task<ServiceResult> DeleteMedication(int medicationId)
        {
            Medication? medication = await _medicationRepository.FindByIdAsync(medicationId);
                if (medication == null)
                {
                return ServiceResult.Success();
                }
            await _medicationRepository.DeleteAsync(medication);
            return ServiceResult.Success();            
        }

        public async Task<ServiceResult<MedicationResponse>> GetMedicationByIdAsync(int id)
        {
            var medication = await _medicationRepository.FindByIdAsync(id);
            if (medication == null)
                return ServiceResult<MedicationResponse>.NotFound($"Medication {id} not found");

            return ServiceResult<MedicationResponse>.Success(_mapper.ToMedicationResponse(medication));
        }

        public async Task<ServiceResult<IEnumerable<MedicationResponse>>> GetMedicationsByPatientIdAsync(int patientId)
        {       
           var patientMedications = await _medicationRepository.GetAllMedications(patientId);

            var medicationResponses = patientMedications.Select(medication => _mapper.ToMedicationResponse(medication));
            return ServiceResult<IEnumerable<MedicationResponse>>.Success(medicationResponses);
        }
    }
}
