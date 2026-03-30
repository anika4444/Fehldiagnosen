using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.SymptomService
{
    public class SymptomService : ISymptomService
    {
        private readonly IPatientSymptomRepository _patientSymptomRepository;
        private readonly ISymptomDefinitionRepository _symptomDefinitionRepository;
        private readonly IPatientRepository _patientRepository;

        private readonly DtoMapper _mapper;
        public SymptomService(IPatientSymptomRepository patientSymptomRepository, ISymptomDefinitionRepository symptomDefinitionRepository, DtoMapper mapper, IPatientRepository patientRepository)
        {
            _patientSymptomRepository = patientSymptomRepository;
            _symptomDefinitionRepository = symptomDefinitionRepository;
            _mapper = mapper;
            _patientRepository = patientRepository;
        }
        public async Task<ServiceResult<PatientSymptomResponse>> CreateAsync(int patientId, CreatePatientSymptomRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            
            if (patient == null)
            {
                return ServiceResult<PatientSymptomResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }

            if (request.SymptomId != null)
            {
                var symptomDefinition = await _symptomDefinitionRepository.FindByIdAsync(request.SymptomId ?? 0);
                
                if (symptomDefinition == null)
                {
                    return ServiceResult<PatientSymptomResponse>.NotFound($"Symptomdefinition mit ID {request.SymptomId} existiert nicht.");
                }
            }

            var symptom = new PatientSymptom() 
            {
                PatientId = patientId,
                SymptomName = request.SymptomName,
                SymptomDefinitionId = request.SymptomId,
                OccurrenceTime = request.OccurrenceTime,
                Intensity = request.Intensity,
                Duration = request.Duration,
                PossibleTrigger = request.PossibleTrigger,
                Notes = request.Notes,
                Details = request.Details
             };

            var newSymptom = await _patientSymptomRepository.AddAsync(symptom);
            
            return ServiceResult<PatientSymptomResponse>.Success(_mapper.ToPatientSymptomResponse(newSymptom));
        }

        public async Task<ServiceResult> DeleteAsync(int symptomId)
        {
            var existingSymptom = await _patientSymptomRepository.FindByIdAsync(symptomId);

            if(existingSymptom == null) 
            {
                return ServiceResult.NotFound($"Symptom mit ID {symptomId} existiert nicht.");
            }

            await _patientSymptomRepository.DeleteAsync(existingSymptom);

            return ServiceResult.Success();
        }

        public async Task<ServiceResult<PatientSymptomResponse>> GetByIdAsync(int symptomId)
        {
            var symptom = await _patientSymptomRepository.FindByIdAsync(symptomId);

            if(symptom == null)
            {
                return ServiceResult<PatientSymptomResponse>.NotFound($"Symptom {symptomId} existiert nicht.");
            }

            return ServiceResult<PatientSymptomResponse>.Success(_mapper.ToPatientSymptomResponse(symptom));
        }

        public async Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetAllAsync(int patientId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            
            if (patient == null)
            {
                return ServiceResult<IEnumerable<PatientSymptomResponse>>.NotFound($"Patient {patientId} existiert nicht.");
            }
            
            var symptoms = await _patientSymptomRepository.FindAllByPatientIdAsync(patientId);
            return ServiceResult<IEnumerable<PatientSymptomResponse>>.Success(_mapper.ToPatientSymptomResponseList(symptoms));
        }

        public async Task<ServiceResult<IEnumerable<PatientSymptomResponse>>> GetAllByDateAsync(int patientId, DateTime date)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
            {
                return ServiceResult<IEnumerable<PatientSymptomResponse>>.NotFound($"Patient {patientId} existiert nicht.");
            }

            var symptoms = await _patientSymptomRepository.FindAllByPatientIdAndDateAsync(patientId, date);
            
            return ServiceResult<IEnumerable<PatientSymptomResponse>>.Success(_mapper.ToPatientSymptomResponseList(symptoms));
        }

        public async Task<ServiceResult<IEnumerable<SymptomDefinitionResponse>>> GetSymptomDefinitionsByNameAsync(string name)
        {
            var definitions = await _symptomDefinitionRepository.SearchByNameAsync(name);
            
            return ServiceResult<IEnumerable<SymptomDefinitionResponse>>.Success(_mapper.ToSymptomDefinitionList(definitions));
        }

        public async Task<ServiceResult<PatientSymptomResponse>> UpdateAsync(int patientId, int symptomId, UpdatePatientSymptomRequest request)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            
            if(patient == null)
            {
                return ServiceResult<PatientSymptomResponse>.NotFound($"Patient {patientId} existiert nicht.");
            }

            var existingSymptom = await _patientSymptomRepository.FindByIdAsync(symptomId);
            
            if (existingSymptom == null || existingSymptom.PatientId != patientId)
            {
                return ServiceResult<PatientSymptomResponse>.NotFound($"Symptom mit ID {symptomId} existiert nicht.");
            }

            existingSymptom.SymptomName = request.SymptomName;
            existingSymptom.SymptomDefinitionId = request.SymptomId;
            existingSymptom.OccurrenceTime = request.OccurrenceTime;                
            existingSymptom.Intensity = request.Intensity;
            existingSymptom.Duration = request.Duration;
            existingSymptom.PossibleTrigger = request.PossibleTrigger;
            existingSymptom.Notes = request.Notes;
            existingSymptom.Details = request.Details;

            var updatedSymptom = await _patientSymptomRepository.UpdateAsync(existingSymptom);

            return ServiceResult<PatientSymptomResponse>.Success(_mapper.ToPatientSymptomResponse(updatedSymptom));
        }
    }
}
