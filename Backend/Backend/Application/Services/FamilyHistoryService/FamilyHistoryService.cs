using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.FamilyHistoryService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.FamilyHistoryService
{
    public class FamilyHistoryService : IFamilyHistoryService
    {
        private IFamilyHistoryRepository _familyHistoryRepository;
        private IPatientRepository _patientRepository;
        private DtoMapper _mapper;

        public FamilyHistoryService(IFamilyHistoryRepository familyHistoryRepository, IPatientRepository patientRepository, DtoMapper mapper)
        {
            _familyHistoryRepository = familyHistoryRepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>> GetAllByPatientIdAsync(int patientId)
        {
            var entries = await _familyHistoryRepository.FindByPatientIdAsync(patientId);
            var mapped = entries.Select(entry => _mapper.ToFamilyHistoryEntryResponse(entry)).ToList();
            return ServiceResult<IEnumerable<FamilyHistoryEntryResponse>>.Success(mapped);
        }

        public async Task<ServiceResult<FamilyHistoryEntryResponse>> GetByIdAsync(int historyEntryId)
        {
            var entry = await _familyHistoryRepository.FindByIdAsync(historyEntryId);
            if (entry == null)
            {
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Eintrag mit ID {historyEntryId} nicht gefunden.");
            }
            return ServiceResult<FamilyHistoryEntryResponse>.Success(_mapper.ToFamilyHistoryEntryResponse(entry));
        }

        public async Task<ServiceResult<FamilyHistoryEntryResponse>> CreateAsync(int patientId, CreateFamilyHistoryEntryRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            if (patient == null)
            {
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Patient mit ID {patientId} nicht gefunden.");
            }

            var entry = new FamilyHistoryEntry
            {
                PatientId = patientId,
                Relative = request.Relative,
                Diagnosis = request.Diagnosis,
                Comment = request.Comment
            };

            var createdEntry = await _familyHistoryRepository.AddAsync(entry);
            return ServiceResult<FamilyHistoryEntryResponse>.Success(_mapper.ToFamilyHistoryEntryResponse(createdEntry));
        }

        public async Task<ServiceResult<FamilyHistoryEntryResponse>> UpdateAsync(int patientId, int historyEntryId, UpdateFamilyHistoryEntryRequest request)
        {
            var existingEntry = await _familyHistoryRepository.FindByIdAsync(historyEntryId);
            if (existingEntry == null || existingEntry.PatientId != patientId)
            {
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Eintrag mit ID {historyEntryId} für Patient {patientId} nicht gefunden.");
            }

            existingEntry.Relative = request.Relative;
            existingEntry.Diagnosis = request.Diagnosis;
            existingEntry.Comment = request.Comment;

            var updatedEntry = await _familyHistoryRepository.UpdateAsync(existingEntry);
            return ServiceResult<FamilyHistoryEntryResponse>.Success(_mapper.ToFamilyHistoryEntryResponse(updatedEntry));
        }

        public async Task<ServiceResult<FamilyHistoryEntryResponse>> DeleteAsync(int historyEntryId)
        {
            var existingEntry = await _familyHistoryRepository.FindByIdAsync(historyEntryId);
            if (existingEntry == null)
            {
                return ServiceResult<FamilyHistoryEntryResponse>.NotFound($"Eintrag mit ID {historyEntryId} nicht gefunden.");
            }

            var deletedEntry = await _familyHistoryRepository.DeleteAsync(existingEntry);
            return ServiceResult<FamilyHistoryEntryResponse>.Success(_mapper.ToFamilyHistoryEntryResponse(deletedEntry));
        }
    }
}