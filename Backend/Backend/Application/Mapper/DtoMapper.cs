using Backend.Application.Services.MedicationService.Dto;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Domain.Entities;


namespace Backend.Application.Mapper
{
    public class DtoMapper
    {
        public PatientSymptomResponse ToPatientSymptomResponse(PatientSymptom symptom)
        {
            return new PatientSymptomResponse
            {
                Id = symptom.Id,
                PatientId = symptom.PatientId,
                SymptomId = symptom.SymptomDefinitionId,
                SymptomName = symptom.SymptomName,
                DefinedSymptomName = symptom.SymptomDefinition?.Name,
                OccurrenceTime = symptom.OccurrenceTime,
                Intensity = symptom.Intensity,
                Duration = symptom.Duration,
                PossibleTrigger = symptom.PossibleTrigger,
                Notes = symptom.Notes,
                Details = symptom.Details ?? new Dictionary<string, string?>(),
                CreatedAt = symptom.CreatedAt
            };
        }

        public IEnumerable<PatientSymptomResponse> ToPatientSymptomResponseList(IEnumerable<PatientSymptom> symptoms)
        {
            return symptoms.Select(s => ToPatientSymptomResponse(s));
        }

        public MedicationResponse ToMedicationResponse(Medication medication)
        {
            return new MedicationResponse
            {
                Id = medication.Id,
                Name = medication.Name,
            };
        }
    }
}
