using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Application.Services.MedicalHistoryService;
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

        public async Task<IEnumerable<MedicalHistoryEntryResponse>> GetAllAsync(int patientId)
        {
            var medicalHistoryEntries = await _medicalHistoryEntryRepository.FindAllByPatientIdAsync(patientId);

            return medicalHistoryEntries
                .Select(entry => _mapper.ToMedicalHistoryEntryResponse(entry))
                .ToList();
        }

        public async Task<MedicalHistoryEntryResponse> GetByIdAsync(int medicalHistoryEntryId)
        {
            var medicalHistoryEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if(medicalHistoryEntry == null)
            {
                return null;
            }

            return _mapper.ToMedicalHistoryEntryResponse(medicalHistoryEntry);
        }

        public async Task<MedicalHistoryEntryResponse> CreateAsync(int patientId, CreateMedicalHistoryEntryRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null) {
                return null;
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

            return _mapper.ToMedicalHistoryEntryResponse(newMedicalHistoryEntry);
        }

        public async Task<MedicalHistoryEntryResponse> UpdateAsync(int medicalHistoryEntryId, UpdateMedicalHistoryEntryRequest request)
        {
            var existingMedicalHistoryEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryEntryId);

            if (existingMedicalHistoryEntry == null)
            {
                return null;
            }

            existingMedicalHistoryEntry.ICD10Code = request.ICD10Code;
            existingMedicalHistoryEntry.Diagnosis = request.Diagnosis;
            existingMedicalHistoryEntry.Year = request.Year;
            existingMedicalHistoryEntry.Status = request.Status;
            existingMedicalHistoryEntry.Comment = request.Comment;

            var updatedMedicalHistoryEntry = await _medicalHistoryEntryRepository.UpdateAsync(existingMedicalHistoryEntry);

            return _mapper.ToMedicalHistoryEntryResponse(existingMedicalHistoryEntry);
        }

        public async Task<MedicalHistoryEntryResponse> DeleteAsync(int medicalHistoryId)
        {
            var existingMedicalHistoryEntry = await _medicalHistoryEntryRepository.FindByIdAsync(medicalHistoryId);

            if (existingMedicalHistoryEntry == null)
            {
                return null;
            }

            var deletedMedicalHistoryEntry = await _medicalHistoryEntryRepository.DeleteAsync(existingMedicalHistoryEntry);

            return _mapper.ToMedicalHistoryEntryResponse(deletedMedicalHistoryEntry);
        }
    }
}
