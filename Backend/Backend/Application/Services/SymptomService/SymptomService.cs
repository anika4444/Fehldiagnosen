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

        private readonly DtoMapper _mapper;
        public SymptomService(IPatientSymptomRepository patientSymptomRepository, ISymptomDefinitionRepository symptomDefinitionRepository, DtoMapper mapper)
        {
            _patientSymptomRepository = patientSymptomRepository;
            _symptomDefinitionRepository = symptomDefinitionRepository;
            _mapper = mapper;
        }
        public async Task<PatientSymptomResponse> CreatePatientSymptomAsync(CreatePatientSymptomRequest request)
        {
            var symptom = new PatientSymptom() 
            {
                PatientId = request.PatientId,
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
            return _mapper.ToPatientSymptomResponse(newSymptom);
        }

        public Task<bool> DeletePatientSymptomAsync(int symptomId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<PatientSymptomResponse>> GetPatientSymptomsAsync(int patientId)
        {
            var symptoms = await _patientSymptomRepository.GetByPatientIdAsync(patientId);
            return _mapper.ToPatientSymptomResponseList(symptoms);
        }

        public Task<IEnumerable<SymptomDefinition>> GetSymptomDefinitionsByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public Task<PatientSymptom> UpdatePatientSymptomAsync(PatientSymptom symptom)
        {
            throw new NotImplementedException();
        }
    }
}
