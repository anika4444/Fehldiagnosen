using Backend.Application.Common.Access;
using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.DiagnosisService.Dto;
using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Domain.Entities;
using Backend.Domain.Enums;

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
            var access = await _patientRepository.EnsureAccessAsync(patientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<IEnumerable<DiagnosisResponse>>();
            }

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

            var access = await _patientRepository.EnsureAccessAsync(diagnosis.PatientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<DiagnosisResponse>();
            }

            return ServiceResult<DiagnosisResponse>.Success(_mapper.ToDiagnosisResponse(diagnosis));
        }

        public async Task<ServiceResult<DiagnosisResponse>> CreateAsync(int patientId, CreateDiagnosisRequest request, EntryBy entryBy, string? userId)
        {
            var access = await _patientRepository.EnsureAccessAsync(patientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<DiagnosisResponse>();
            }

            if (request.ConditionStatus is not { } conditionStatus)
                return ServiceResult<DiagnosisResponse>.Invalid("Status der Diagnose fehlt.");

            if (string.IsNullOrWhiteSpace(request.Title))
                return ServiceResult<DiagnosisResponse>.Invalid("Titel der Diagnose fehlt.");

            var diagnosis = Diagnosis.Create(
                patientId,
                request.Title,
                conditionStatus,
                entryBy,
                description: request.Description,
                icdCode: request.IcdCode,
                severity: request.Severity,
                sideLocalization: request.SideLocalization,
                medicationText: request.MedicationText,
                symptoms: request.Symptoms,
                findings: request.Findings,
                therapeuticMeasures: request.TherapeuticMeasures,
                note: request.Note,
                diagnosisDate: request.DiagnosisDate);

            var newDiagnosis = await _diagnosisRepository.AddAsync(diagnosis);
            return ServiceResult<DiagnosisResponse>.Success(_mapper.ToDiagnosisResponse(newDiagnosis));
        }

        public async Task<ServiceResult<DiagnosisResponse>> UpdateAsync(int patientId, int diagnosisId, UpdateDiagnosisRequest request, string? userId)
        {
            var access = await _patientRepository.EnsureAccessAsync(patientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure<DiagnosisResponse>();
            }

            var existingEntry = await _diagnosisRepository.FindByIdAsync(diagnosisId);

            if (existingEntry == null || existingEntry.PatientId != patientId)
                return ServiceResult<DiagnosisResponse>.NotFound($"Diagnose mit ID {diagnosisId} existiert nicht.");

            existingEntry.Update(
                title: request.Title,
                description: request.Description,
                icdCode: request.IcdCode,
                severity: request.Severity,
                sideLocalization: request.SideLocalization,
                conditionStatus: request.ConditionStatus,
                medicationText: request.MedicationText,
                symptoms: request.Symptoms,
                findings: request.Findings,
                therapeuticMeasures: request.TherapeuticMeasures,
                note: request.Note,
                diagnosisDate: request.DiagnosisDate);

            var updatedEntry = await _diagnosisRepository.UpdateAsync(existingEntry);
            return ServiceResult<DiagnosisResponse>.Success(_mapper.ToDiagnosisResponse(updatedEntry));
        }

        public async Task<ServiceResult<DiagnosisResponse>> UpdateAiExplanation(int diagnosisId, string? aiExplanation)
        {
            var diagnosis = await _diagnosisRepository.FindByIdAsync(diagnosisId);

            if (diagnosis == null)
                return ServiceResult<DiagnosisResponse>.NotFound($"Diagnose {diagnosisId} existiert nicht.");

            diagnosis.UpdateAiExplanation(aiExplanation);

            var updatedEntry = await _diagnosisRepository.UpdateAsync(diagnosis);
            return ServiceResult<DiagnosisResponse>.Success(_mapper.ToDiagnosisResponse(updatedEntry));
        }

        public async Task<ServiceResult> DeleteAsync(int diagnosisId, string? userId)
        {
            var existing = await _diagnosisRepository.FindByIdAsync(diagnosisId);

            if (existing == null)
                return ServiceResult.NotFound($"Diagnose {diagnosisId} existiert nicht.");

            var access = await _patientRepository.EnsureAccessAsync(existing.PatientId, userId);

            if (!access.IsSuccess)
            {
                return access.ToFailure();
            }

            await _diagnosisRepository.DeleteAsync(existing);
            return ServiceResult.Success();
        }
    }
}