using Backend.Application.Common.Results;
using Backend.Application.Interfaces;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.MedicalLetterService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicalLetterService
{
    public class MedicalLetterService : IMedicalLetterService
    {
        private readonly IMedicalLetterRepository _medicalLetterRepository;
        private readonly DtoMapper _mapper;

        public MedicalLetterService(IMedicalLetterRepository medicalLetterRepository, DtoMapper mapper)
        {
            _medicalLetterRepository = medicalLetterRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<MedicalLetterResponse>> GetByIdAsync(int id, string? userId)
        {
            var letter = await _medicalLetterRepository.FindByIdAsync(id);
            if (letter == null)
                return ServiceResult<MedicalLetterResponse>.NotFound($"MedicalLetter {id} nicht gefunden");

            return ServiceResult<MedicalLetterResponse>.Success(_mapper.ToMedicalLetterResponse(letter));
        }

        public async Task<ServiceResult<IEnumerable<MedicalLetterResponse>>> GetByPatientIdAsync(int patientId, string? userId)
        {
            var letters = await _medicalLetterRepository.FindAllAsync();
            var filtered = letters
                .Where(l => l.PatientId == patientId)
                .Select(l => _mapper.ToMedicalLetterResponse(l));

            return ServiceResult<IEnumerable<MedicalLetterResponse>>.Success(filtered);
        }

        public async Task<ServiceResult<MedicalLetterResponse>> CreateAsync(CreateMedicalLetterRequest request, string? userId)
        {
            var letter = new MedicalLetter
            {
                PatientId = request.PatientId,
                Subject = request.Subject,
                ReciverName = request.ReciverName,
                Status = Status.Validation
            };

            var created = await _medicalLetterRepository.AddAsync(letter);
            return ServiceResult<MedicalLetterResponse>.Success(_mapper.ToMedicalLetterResponse(created));
        }

        public async Task<ServiceResult<MedicalLetterResponse>> UpdateAsync(int id, CreateMedicalLetterRequest request, string? userId)
        {
            var letter = await _medicalLetterRepository.FindByIdAsync(id);
            if (letter == null)
                return ServiceResult<MedicalLetterResponse>.NotFound($"MedicalLetter {id} nicht gefunden");

            letter.Subject = request.Subject;
            letter.ReciverName = request.ReciverName;
            letter.UpdatedAt = DateTime.UtcNow;

            var updated = await _medicalLetterRepository.UpdateAsync(letter);
            return ServiceResult<MedicalLetterResponse>.Success(_mapper.ToMedicalLetterResponse(updated));
        }

        public async Task<ServiceResult> DeleteAsync(int id, string? userId)
        {
            var letter = await _medicalLetterRepository.FindByIdAsync(id);
            if (letter == null)
                return ServiceResult.NotFound($"MedicalLetter {id} nicht gefunden");

            await _medicalLetterRepository.DeleteAsync(letter);
            return ServiceResult.Success();
        }
    }
}