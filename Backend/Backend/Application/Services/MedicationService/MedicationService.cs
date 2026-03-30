using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
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
        public async Task<ServiceResult<MedicationResponse>> CreateAsync(int patientId, CreateMedicationRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            
            if (patient == null)
            {
                return ServiceResult<MedicationResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }
            
            var medication = new Medication()
            {
                Name = request.Name,
                PatientId = patientId,
                Dosage = request.Dosage,
                IntakeFrequency = request.IntakeFrequency,
                IntakeStartDate = request.IntakeStartDate,
                DurationInDays = request.DurationInDays,
                Indication = request.Indication,
                EntryBy = request.EntryBy,
                Notes = request.Notes
            };

            var newMedication = await _medicationRepository.AddAsync(medication);

            return ServiceResult<MedicationResponse>.Success(_mapper.ToMedicationResponse(newMedication));   
        }
        public async Task<ServiceResult<MedicationResponse>> UpdateAsync(int patientId, int medicationId, UpdateMedicationRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            
            if (patient == null)
            {
                return ServiceResult<MedicationResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }

            var existingMedication = await _medicationRepository.FindByIdAsync(medicationId);
            
            if (existingMedication == null)
            {
                return ServiceResult<MedicationResponse>.NotFound("Medikation existiert nicht");
            }

            existingMedication.Name = request.Name;
            existingMedication.Dosage = request.Dosage;
            existingMedication.IntakeFrequency = request.IntakeFrequency;
            existingMedication.IntakeStartDate = request.IntakeStartDate;
            existingMedication.DurationInDays = request.DurationInDays;
            existingMedication.Indication = request.Indication;
            existingMedication.EntryBy = request.EntryBy;
            existingMedication.Notes = request.Notes;
            

            var updatedMedication = await _medicationRepository.UpdateAsync(existingMedication);
            
            return ServiceResult<MedicationResponse>.Success(_mapper.ToMedicationResponse(updatedMedication));

        }
        public async Task<ServiceResult<IEnumerable<MedicationResponse>>> GetAllAsync(int patientId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
            {
                return ServiceResult<IEnumerable<MedicationResponse>>.NotFound($"Patient {patientId} existiert nicht.");
            }

            var medications = await _medicationRepository.FindAllByPatientIdAsync(patientId);

            return ServiceResult<IEnumerable<MedicationResponse>>.Success(medications.Select(medication => _mapper.ToMedicationResponse(medication)));
        }

        public async Task<ServiceResult> DeleteAsync(int medicationId)
        {
            var existingMedication = await _medicationRepository.FindByIdAsync(medicationId);


            if (existingMedication == null)
            {
                return ServiceResult.NotFound($"Medikament mit ID {medicationId} existiert nicht.");
            }

            await _medicationRepository.DeleteAsync(existingMedication);
            
            return ServiceResult.Success();            
        }

        public async Task<ServiceResult<MedicationResponse>> GetByIdAsync(int medicationId)
        {
            var medication = await _medicationRepository.FindByIdAsync(medicationId);

            if (medication == null)
            {
                return ServiceResult<MedicationResponse>.NotFound($"Medikament {medicationId} existiert nicht.");
            }

            return ServiceResult<MedicationResponse>.Success(_mapper.ToMedicationResponse(medication));
        }
    }
}
