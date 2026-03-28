using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicalHistoryEntryService
{
    public class MedicalHistoryEntryService : IMedicalHistoryEntryService
    {
        private IMedicalHistoryRepository _medicalHistoryEntryRepository;
        private IPatientRepository _patientRepository;

        private DtoMapper _mapper;

        public MedicalHistoryEntryService(IMedicalHistoryRepository medicalHistoryEntryRepository, IPatientRepository patientRepository, DtoMapper mapper)
        {
            _medicalHistoryEntryRepository = medicalHistoryEntryRepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>> GetAllAsync(int patientId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            
            if (patient == null)
            {
                return ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>.NotFound($"Patient {patientId} existiert nicht.");
            }

            var medicalHistoryEntries = await _medicalHistoryEntryRepository.FindAllByPatientIdAsync(patientId);

            return ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>.Success(medicalHistoryEntries.Select(medicalHistoryEntry => _mapper.ToMedicalHistoryEntryResponse(medicalHistoryEntry))); 
        }

        public async Task<ServiceResult<MedicalHistoryEntryResponse>> GetByIdAsync(int medicalHistoryEntryId)
        {
            var medicalHistoryEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if(medicalHistoryEntry == null)
            {
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Verkrankung {medicalHistoryEntryId} existiert nicht.");
            }

            return ServiceResult<MedicalHistoryEntryResponse>.Success(_mapper.ToMedicalHistoryEntryResponse(medicalHistoryEntry));
        }

        public async Task<ServiceResult<MedicalHistoryEntryResponse>> CreateAsync(int patientId, CreateMedicalHistoryEntryRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null) 
            {
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }

            var medicalHistoryEntry = new MedicalHistoryEntry()
            {
                PatientId = patientId,
                ICD10Code = request.ICD10Code,
                Diagnosis = request.Diagnosis,
                Year = request.Year,
                Status = request.Status,
                Comment = request.Comment,
                EntryBy = request.EntryBy
            };

            var newMedicalHistoryEntry = await _medicalHistoryEntryRepository.AddAsync(medicalHistoryEntry);

            return ServiceResult<MedicalHistoryEntryResponse>.Success(_mapper.ToMedicalHistoryEntryResponse(newMedicalHistoryEntry));
        }

        public async Task<ServiceResult<MedicalHistoryEntryResponse>> UpdateAsync(int patientId, int medicalHistoryEntryId, UpdateMedicalHistoryEntryRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            if (patient == null)
            {
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }

            var existingMedicalHistoryEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if (existingMedicalHistoryEntry == null || existingMedicalHistoryEntry.PatientId != patientId)
            {
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Vorerkrankung mit ID {medicalHistoryEntryId} existiert nicht.");
            }

            existingMedicalHistoryEntry.ICD10Code = request.ICD10Code;
            existingMedicalHistoryEntry.Diagnosis = request.Diagnosis;
            existingMedicalHistoryEntry.Year = request.Year;
            existingMedicalHistoryEntry.Status = request.Status;
            existingMedicalHistoryEntry.Comment = request.Comment;

            var updatedMedicalHistoryEntry = await _medicalHistoryEntryRepository.UpdateAsync(existingMedicalHistoryEntry);

            return ServiceResult<MedicalHistoryEntryResponse>.Success(_mapper.ToMedicalHistoryEntryResponse(existingMedicalHistoryEntry));
        }

        public async Task<ServiceResult> DeleteAsync(int medicalHistoryEntryId)
        {
            var existingMedicalHistoryEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if (existingMedicalHistoryEntry == null)
            {
                return ServiceResult.NotFound($"Vorerkrankung mit ID {medicalHistoryEntryId} existiert nicht.");
            }

            await _medicalHistoryEntryRepository.DeleteAsync(existingMedicalHistoryEntry);

            return ServiceResult.Success();
        }
    }
}
