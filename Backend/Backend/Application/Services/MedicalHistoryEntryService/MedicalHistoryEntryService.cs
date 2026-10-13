using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicalHistoryEntryService
{
    public class MedicalHistoryEntryService : IMedicalHistoryEntryService
    {
        private IMedicalHistoryEntryRepository _medicalHistoryEntryRepository;
        private IPatientRepository _patientRepository;
        private DtoMapper _mapper;

        public MedicalHistoryEntryService(IMedicalHistoryEntryRepository medicalHistoryEntryRepository, IPatientRepository patientRepository, DtoMapper mapper)
        {
            _medicalHistoryEntryRepository = medicalHistoryEntryRepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>> GetAllAsync(int patientId, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var entries = await _medicalHistoryEntryRepository.FindAllByPatientIdAsync(patientId);
            return ServiceResult<IEnumerable<MedicalHistoryEntryResponse>>.Success(
                entries.Select(e => _mapper.ToMedicalHistoryEntryResponse(e))
            );
        }

        public async Task<ServiceResult<MedicalHistoryEntryResponse>> GetByIdAsync(int medicalHistoryEntryId, string? userId)
        {
            var medicalHistoryEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if (medicalHistoryEntry == null)
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Vorerkrankung {medicalHistoryEntryId} existiert nicht.");

            var patient = await _patientRepository.FindByIdAsync(medicalHistoryEntry.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult<MedicalHistoryEntryResponse>.Forbidden("Kein Zugriff auf diesen Eintrag.");

            return ServiceResult<MedicalHistoryEntryResponse>.Success(_mapper.ToMedicalHistoryEntryResponse(medicalHistoryEntry));
        }

        public async Task<ServiceResult<MedicalHistoryEntryResponse>> CreateAsync(int patientId, CreateMedicalHistoryEntryRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<MedicalHistoryEntryResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var medicalHistoryEntry = new MedicalHistoryEntry
            {
                PatientId = patientId,
                ICD10Code = request.ICD10Code,
                Diagnosis = request.Diagnosis,
                Year = request.Year,
                Status = request.Status,
                Comment = request.Comment,
                EntryBy = request.EntryBy
            };

            var newEntry = await _medicalHistoryEntryRepository.AddAsync(medicalHistoryEntry);
            return ServiceResult<MedicalHistoryEntryResponse>.Success(_mapper.ToMedicalHistoryEntryResponse(newEntry));
        }

        public async Task<ServiceResult<MedicalHistoryEntryResponse>> UpdateAsync(int patientId, int medicalHistoryEntryId, UpdateMedicalHistoryEntryRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<MedicalHistoryEntryResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var existingEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if (existingEntry == null || existingEntry.PatientId != patientId)
                return ServiceResult<MedicalHistoryEntryResponse>.NotFound($"Vorerkrankung mit ID {medicalHistoryEntryId} existiert nicht.");

            existingEntry.ICD10Code = request.ICD10Code;
            existingEntry.Diagnosis = request.Diagnosis;
            existingEntry.Year = request.Year;
            existingEntry.Status = request.Status;
            existingEntry.Comment = request.Comment;
            existingEntry.AiExplanation = request.AiExplanation;

            var updatedEntry = await _medicalHistoryEntryRepository.UpdateAsync(existingEntry);
            return ServiceResult<MedicalHistoryEntryResponse>.Success(_mapper.ToMedicalHistoryEntryResponse(updatedEntry));
        }

        public async Task<ServiceResult> DeleteAsync(int medicalHistoryEntryId, string? userId)
        {
            var existingEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if (existingEntry == null)
                return ServiceResult.NotFound($"Vorerkrankung mit ID {medicalHistoryEntryId} nicht gefunden.");

            var patient = await _patientRepository.FindByIdAsync(existingEntry.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult.Forbidden("Kein Zugriff auf diesen Eintrag.");

            await _medicalHistoryEntryRepository.DeleteAsync(existingEntry);
            return ServiceResult.Success();
        }
    }
}