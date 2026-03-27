using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicationService.Dto;
using Backend.Domain.Entities;
using Org.BouncyCastle.Asn1.Ocsp;

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
        public async Task<ServiceResult<MedicationResponse?>> CreateMedication(int patientId, CreateMedicationRequest createMedicationRequest)
        {
            Patient? patient = await _patientRepository.FindByIdAsync(patientId);
            if (patient == null) 
            { return ServiceResult<MedicationResponse?>.NotFound("Patient existiert nicht"); }
            var medication = new Medication()
            {
                Name = createMedicationRequest.Name,
                PatientId = patientId,
            };
            
            Medication newMedication = await _medicationRepository.AddAsync(medication);
            return ServiceResult<MedicationResponse?>.Success(_mapper.ToMedicationResponse(newMedication));   
        }
        public async Task<ServiceResult<MedicationResponse?>> UpdateMedication(int medicationId, CreateMedicationRequest createMedicationRequest)
        {
            var medicationInRepo = await _medicationRepository.FindByIdAsync(medicationId);
            if (medicationId == medicationInRepo.Id)
            {
                //medicationInRepo.Patient = createMedicationRequest.
                medicationInRepo.Name = createMedicationRequest.Name;
                medicationInRepo.PatientId = createMedicationRequest.PatientId;
                medicationInRepo.Dosage = createMedicationRequest.Dosage;
                medicationInRepo.IntakeFrequency = createMedicationRequest.IntakeFrequency;
                medicationInRepo.IntakeStartDate = createMedicationRequest.IntakeStartDate;
                medicationInRepo.DurationInDays = createMedicationRequest.DurationInDays;
                medicationInRepo.Indication = createMedicationRequest.Indication;
                medicationInRepo.EntryBy = createMedicationRequest.EntryBy;

            }
            { return ServiceResult<MedicationResponse?>.NotFound("Medikation existiert nicht"); }
      
            //return ServiceResult<MedicationResponse?>.Success(_mapper.ToMedicationResponse(newMedication));
        }
        public async Task<ServiceResult<IEnumerable<MedicationResponse>>> GetMedicationsByPatientIdAsync(int patientId)
        {
            var patientMedications = await _medicationRepository.GetAllMedications(patientId);

            var medicationResponses = patientMedications.Select(medication => _mapper.ToMedicationResponse(medication));
            return ServiceResult<IEnumerable<MedicationResponse>>.Success(medicationResponses);
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


    }
}
