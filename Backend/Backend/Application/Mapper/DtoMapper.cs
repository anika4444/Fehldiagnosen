using Backend.Application.Services.MedicalHistoryEntryService.Dto;
using Backend.Application.Services.MedicationService.Dto;
using Backend.Application.Services.SymptomService.Dto;
using Backend.Application.Services.FamilyHistoryService.Dto;
using Backend.Domain.Entities;
using Org.BouncyCastle.Asn1;


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

        public SymptomDefinitionResponse ToSymptomDefinitionResponse(SymptomDefinition definition)
        {
            return new SymptomDefinitionResponse
            {
                Id = definition.Id,
                Name = definition.Name,
                Aliases = definition.Aliases?.ToList() ?? new List<string>(),
                Fields = definition.Fields?.Select(field => new SymptomFieldResponse
                {
                    Name = field.Name,
                    Type = field.Type,
                    Options = field.Options?.ToList() ?? new List<string?>(),
                    IsRequired = field.IsRequired
                }).ToList() ?? new List<SymptomFieldResponse>()
            };
        }

        public IEnumerable<PatientSymptomResponse> ToPatientSymptomResponseList(IEnumerable<PatientSymptom> symptoms)
        {
            return symptoms.Select(s => ToPatientSymptomResponse(s));
        }

        public IEnumerable<SymptomDefinitionResponse> ToSymptomDefinitionList(IEnumerable<SymptomDefinition> definitions)
        {
            return definitions.Select(d => ToSymptomDefinitionResponse(d));
        }

        public MedicationResponse ToMedicationResponse(Medication medication)
        {
            return new MedicationResponse
            {
                Id = medication.Id,
                Name = medication.Name,
            };
        }

        public MedicalHistoryEntryResponse ToMedicalHistoryEntryResponse(MedicalHistoryEntry medicalHistoryEntry)
        {
            return new MedicalHistoryEntryResponse
            {
                Id = medicalHistoryEntry.Id,
                PatientId = medicalHistoryEntry.PatientId,
                ICD10Code = medicalHistoryEntry.ICD10Code,
                Diagnosis = medicalHistoryEntry.Diagnosis,
                Year = medicalHistoryEntry.Year,
                Status = medicalHistoryEntry.Status,
                Comment = medicalHistoryEntry.Comment,
                EntryBy = medicalHistoryEntry.EntryBy,
            };
        }

        public FamilyHistoryEntryResponse ToFamilyHistoryEntryResponse(FamilyHistoryEntry entry)
        {
            return new FamilyHistoryEntryResponse
            {
                Id = entry.Id,
                PatientId = entry.PatientId,
                Relative = entry.Relative,
                Diagnosis = entry.Diagnosis,
                Comment = entry.Comment,
            };
        }

        public IEnumerable<FamilyHistoryEntryResponse> ToFamilyHistoryEntryResponseList(IEnumerable<FamilyHistoryEntry> entries)
        {
            return entries.Select(e => ToFamilyHistoryEntryResponse(e));
        }

        public FamilyHistoryEntry ToFamilyHistoryEntry(CreateFamilyHistoryEntryRequest request)
        {
            return new FamilyHistoryEntry
            {
                Relative = request.Relative,
                Diagnosis = request.Diagnosis,
                Comment = request.Comment
            };
        }
    }
}
