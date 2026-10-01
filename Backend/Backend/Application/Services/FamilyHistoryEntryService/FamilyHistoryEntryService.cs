using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.FamilyHistoryService.Dto;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.FamilyHistoryService
{
    public class FamilyHistoryEntryService : IFamilyHistoryEntryService
    {
        private IFamilyHistoryEntryRepository _familyHistoryEntryRepository;
        private IPatientRepository _patientRepository;
        private DtoMapper _mapper;

        public FamilyHistoryEntryService(IFamilyHistoryEntryRepository familyHistoryEntryRepository, IPatientRepository patientRepository, DtoMapper mapper)
        {
            _familyHistoryEntryRepository = familyHistoryEntryRepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>> GetAllAsync(int patientId, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var entries = await _familyHistoryEntryRepository.FindAllByPatientIdAsync(patientId);
            return ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>.Success(
                entries.Select(e => _mapper.ToFamilyHistoryEntryResponse(e))
            );
        }

        public async Task<ServiceResult<FamilyHistoryEntryResponse>> GetByIdAsync(int familyHistoryEntryId, string? userId)
        {
            var familyHistoryEntry = await _familyHistoryEntryRepository.FindByIdAsync(familyHistoryEntryId);

            if (familyHistoryEntry == null)
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Familiengeschichte {familyHistoryEntryId} nicht gefunden.");

            var patient = await _patientRepository.FindByIdAsync(familyHistoryEntry.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult<FamilyHistoryEntryResponse>.Forbidden("Kein Zugriff auf diesen Eintrag.");

            return ServiceResult<FamilyHistoryEntryResponse>.Success(_mapper.ToFamilyHistoryEntryResponse(familyHistoryEntry));
        }

        public async Task<ServiceResult<FamilyHistoryEntryResponse>> CreateAsync(int patientId, CreateFamilyHistoryEntryRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<FamilyHistoryEntryResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var familyHistoryEntry = new FamilyHistoryEntry
            {
                PatientId = patientId,
                Relative = request.Relative,
                Diagnosis = request.Diagnosis,
                Comment = request.Comment
            };

            var newFamilyHistoryEntry = await _familyHistoryEntryRepository.AddAsync(familyHistoryEntry);
            return ServiceResult<FamilyHistoryEntryResponse>.Success(_mapper.ToFamilyHistoryEntryResponse(newFamilyHistoryEntry));
        }

        public async Task<ServiceResult<FamilyHistoryEntryResponse>> UpdateAsync(int patientId, int familyHistoryEntryId, UpdateFamilyHistoryEntryRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<FamilyHistoryEntryResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var existingFamilyHistoryEntry = await _familyHistoryEntryRepository.FindByIdAsync(familyHistoryEntryId);

            if (existingFamilyHistoryEntry == null || existingFamilyHistoryEntry.PatientId != patientId)
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Familiengeschichte mit ID {familyHistoryEntryId} existiert nicht.");

            existingFamilyHistoryEntry.Relative = request.Relative;
            existingFamilyHistoryEntry.Diagnosis = request.Diagnosis;
            existingFamilyHistoryEntry.Comment = request.Comment;

            var updatedFamilyHistoryEntry = await _familyHistoryEntryRepository.UpdateAsync(existingFamilyHistoryEntry);
            return ServiceResult<FamilyHistoryEntryResponse>.Success(_mapper.ToFamilyHistoryEntryResponse(updatedFamilyHistoryEntry));
        }

        public async Task<ServiceResult> DeleteAsync(int familyHistoryEntryId, string? userId)
        {
            var existingFamilyHistoryEntry = await _familyHistoryEntryRepository.FindByIdAsync(familyHistoryEntryId);

            if (existingFamilyHistoryEntry == null)
                return ServiceResult.NotFound($"Familiengeschichte mit ID {familyHistoryEntryId} nicht gefunden.");

            var patient = await _patientRepository.FindByIdAsync(existingFamilyHistoryEntry.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult.Forbidden("Kein Zugriff auf diesen Eintrag.");

            await _familyHistoryEntryRepository.DeleteAsync(existingFamilyHistoryEntry);
            return ServiceResult.Success();
        }
    }
}