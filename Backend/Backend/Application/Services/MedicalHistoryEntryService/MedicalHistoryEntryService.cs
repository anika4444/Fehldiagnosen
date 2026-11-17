using Backend.Application.Common.Access;
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
            var access = await _patientRepository.EnsureAccessAsync(patientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<IEnumerable<MedicalHistoryEntryResponse>>();
            }

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

            var access = await _patientRepository.EnsureAccessAsync(medicalHistoryEntry.PatientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<MedicalHistoryEntryResponse>();
            }

            return ServiceResult<MedicalHistoryEntryResponse>.Success(_mapper.ToMedicalHistoryEntryResponse(medicalHistoryEntry));
        }

        public async Task<ServiceResult<MedicalHistoryEntryResponse>> CreateAsync(int patientId, CreateMedicalHistoryEntryRequest request, string? userId)
        {
            var access = await _patientRepository.EnsureAccessAsync(patientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<MedicalHistoryEntryResponse>();
            }

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
            var access = await _patientRepository.EnsureAccessAsync(patientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<MedicalHistoryEntryResponse>();
            }

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

            var access = await _patientRepository.EnsureAccessAsync(existingEntry.PatientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure();
            }

            await _medicalHistoryEntryRepository.DeleteAsync(existingEntry);
            return ServiceResult.Success();
        }
    }
}