using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.DiagnosisService.Dto;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.DiagnosisService
{
    public class DiagnosisService : IDiagnosisService
    {
        private readonly IDiagnosisRepository _diagnosisRepository;
        private readonly IPatientRepository _patientRepository;
        private readonly DtoMapper _mapper;

        public DiagnosisService(IDiagnosisRepository diagnosisRepository, IPatientRepository patientRepository, DtoMapper mapper)
        {
            _diagnosisRepository = diagnosisRepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<IEnumerable<DiagnosisResponse>>> GetAllAsync(int patientId, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<IEnumerable<DiagnosisResponse>>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<IEnumerable<DiagnosisResponse>>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var diagnoses = await _diagnosisRepository.FindAllByPatientIdAsync(patientId);
            return ServiceResult<IEnumerable<DiagnosisResponse>>.Success(
                diagnoses.Select(d => _mapper.ToDiagnosisResponse(d))
            );
        }

        public async Task<ServiceResult<DiagnosisResponse>> GetByIdAsync(int diagnosisId, string? userId)
        {
            var diagnosis = await _diagnosisRepository.FindByIdAsync(diagnosisId);

            if (diagnosis == null)
                return ServiceResult<DiagnosisResponse>.NotFound($"Diagnose {diagnosisId} existiert nicht.");

            var patient = await _patientRepository.FindByIdAsync(diagnosis.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult<DiagnosisResponse>.Forbidden("Kein Zugriff auf diese Diagnose.");

            return ServiceResult<DiagnosisResponse>.Success(_mapper.ToDiagnosisResponse(diagnosis));
        }

        public async Task<ServiceResult<DiagnosisResponse>> CreateAsync(int patientId, CreateDiagnosisRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<DiagnosisResponse>.NotFound($"Patient {request.PatientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<DiagnosisResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var diagnosis = new Diagnosis
            {
                PatientId = patientId,
                Title = request.Title,
                Description = request.Description ?? string.Empty,
                IcdCode = request.IcdCode ?? string.Empty,
                Severity = request.Severity ?? string.Empty,
                SideLocalization = request.SideLocalization ?? string.Empty,
                ConditionStatus = request.ConditionStatus,
                EntryBy = request.EntryBy,
                MedicationText = request.MedicationText ?? string.Empty,
                Symptoms = request.Symptoms ?? string.Empty,
                Findings = request.Findings ?? string.Empty,
                TherapeuticMeasures = request.TherapeuticMeasures ?? string.Empty,
                Note = request.Note ?? string.Empty,
                DiagnosisDate = request.DiagnosisDate ?? DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var newDiagnosis = await _diagnosisRepository.AddAsync(diagnosis);
            return ServiceResult<DiagnosisResponse>.Success(_mapper.ToDiagnosisResponse(newDiagnosis));
        }

        public async Task<ServiceResult<DiagnosisResponse>> UpdateAsync(int patientId, int diagnosisId, UpdateDiagnosisRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<DiagnosisResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<DiagnosisResponse>.Forbidden("Kein Zugriff auf diese Diagnose.");

            var existingEntry = await _diagnosisRepository.FindByIdAsync(diagnosisId);

            if (existingEntry == null || existingEntry.PatientId != patientId)
                return ServiceResult<DiagnosisResponse>.NotFound($"Diagnose mit ID {diagnosisId} existiert nicht.");

            existingEntry.Title = request.Title ?? existingEntry.Title;
            existingEntry.Description = request.Description ?? existingEntry.Description;
            existingEntry.IcdCode = request.IcdCode ?? existingEntry.IcdCode;
            existingEntry.Severity = request.Severity ?? existingEntry.Severity;
            existingEntry.SideLocalization = request.SideLocalization ?? existingEntry.SideLocalization;
            existingEntry.ConditionStatus = request.ConditionStatus ?? existingEntry.ConditionStatus;
            existingEntry.MedicationText = request.MedicationText ?? existingEntry.MedicationText;
            existingEntry.Symptoms = request.Symptoms ?? existingEntry.Symptoms;
            existingEntry.Findings = request.Findings ?? existingEntry.Findings;
            existingEntry.TherapeuticMeasures = request.TherapeuticMeasures ?? existingEntry.TherapeuticMeasures;
            existingEntry.Note = request.Note ?? existingEntry.Note;
            existingEntry.DiagnosisDate = request.DiagnosisDate ?? existingEntry.DiagnosisDate;
            existingEntry.AiExplanation = request.AiExplanation ?? existingEntry.AiExplanation;
            existingEntry.UpdatedAt = DateTime.UtcNow;

            var updatedEntry = await _diagnosisRepository.UpdateAsync(existingEntry);
            return ServiceResult<DiagnosisResponse>.Success(_mapper.ToDiagnosisResponse(updatedEntry));
        }

        public async Task<ServiceResult> DeleteAsync(int diagnosisId, string? userId)
        {
            var existing = await _diagnosisRepository.FindByIdAsync(diagnosisId);

            if (existing == null)
                return ServiceResult.NotFound($"Diagnose {diagnosisId} existiert nicht.");

            var patient = await _patientRepository.FindByIdAsync(existing.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult.Forbidden("Kein Zugriff auf diese Diagnose.");

            await _diagnosisRepository.DeleteAsync(existing);
            return ServiceResult.Success();
        }
    }
}