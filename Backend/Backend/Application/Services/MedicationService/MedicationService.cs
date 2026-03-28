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
                Dosage = createMedicationRequest.Dosage,
                IntakeFrequency = createMedicationRequest.IntakeFrequency,
                IntakeStartDate = createMedicationRequest.IntakeStartDate,
                DurationInDays = createMedicationRequest.DurationInDays,
                Indication = createMedicationRequest.Indication,
                EntryBy = createMedicationRequest.EntryBy,
                Notes = createMedicationRequest.Notes
            };

            Medication newMedication = await _medicationRepository.AddAsync(medication);
            return ServiceResult<MedicationResponse?>.Success(_mapper.ToMedicationResponse(newMedication));   
        }
        public async Task<ServiceResult<MedicationResponse?>> UpdateMedication(int medicationId, CreateMedicationRequest createMedicationRequest)
        {
            var result = await _medicationRepository.FindByIdAsync(medicationId);
            if (result == null)
            {
                return ServiceResult<MedicationResponse?>.NotFound("Medikation existiert nicht");
            }

            result.Name = createMedicationRequest.Name;
            result.PatientId = createMedicationRequest.PatientId;
            result.Dosage = createMedicationRequest.Dosage;
            result.IntakeFrequency = createMedicationRequest.IntakeFrequency;
            result.IntakeStartDate = createMedicationRequest.IntakeStartDate;
            result.DurationInDays = createMedicationRequest.DurationInDays;
            result.Indication = createMedicationRequest.Indication;
            result.EntryBy = createMedicationRequest.EntryBy;
            result.Notes = createMedicationRequest.Notes;
            

            await _medicationRepository.UpdateAsync(result);
            return ServiceResult<MedicationResponse?>.Success(_mapper.ToMedicationResponse(result));

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
