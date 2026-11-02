using Backend.Application.Common.Results;
using Backend.Application.Mapper;
using Backend.Application.Repositories;
using Backend.Application.Services.DrugInteractionService;
using Backend.Application.Services.MedicationService.Dto;
using Backend.Domain.Entities;

namespace Backend.Application.Services.MedicationService
{
    public class MedicationService : IMedicationService
    {
        private readonly IMedicationRepository _medicationRepository;
        private readonly IPatientRepository _patientRepository;
        private readonly IDrugInteractionService _drugInteractionService;
        private readonly DtoMapper _mapper;

        public MedicationService(IMedicationRepository medicationrepository, IPatientRepository patientRepository, DtoMapper mapper, IDrugInteractionService drugInteractionService)
        {
            _medicationRepository = medicationrepository;
            _patientRepository = patientRepository;
            _mapper = mapper;
            _drugInteractionService = drugInteractionService;
        }

        public async Task<ServiceResult<IEnumerable<MedicationResponse>>> GetAllAsync(int patientId, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<IEnumerable<MedicationResponse>>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<IEnumerable<MedicationResponse>>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var medications = await _medicationRepository.FindAllByPatientIdAsync(patientId);
            return ServiceResult<IEnumerable<MedicationResponse>>.Success(
                medications.Select(m => _mapper.ToMedicationResponse(m))
            );
        }

        public async Task<ServiceResult<MedicationResponse>> GetByIdAsync(int medicationId, string? userId)
        {
            var medication = await _medicationRepository.FindByIdAsync(medicationId);

            if (medication == null)
                return ServiceResult<MedicationResponse>.NotFound($"Medikament {medicationId} existiert nicht.");

            var patient = await _patientRepository.FindByIdAsync(medication.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult<MedicationResponse>.Forbidden("Kein Zugriff auf dieses Medikament.");

            return ServiceResult<MedicationResponse>.Success(_mapper.ToMedicationResponse(medication));
        }

        public async Task<ServiceResult<MedicationResponse>> CreateAsync(int patientId, CreateMedicationRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<MedicationResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<MedicationResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var medication = new Medication
            {
                Name = request.Name,
                PatientId = patientId,
                Dosage = request.Dosage,
                IntakeFrequency = request.IntakeFrequency,
                IntakeStartDate = request.IntakeStartDate,
                DurationInDays = request.DurationInDays,
                Indication = request.Indication,
                AtcCode = request.AtcCode,
                EntryBy = request.EntryBy,
                Notes = request.Notes
            };

            var newMedication = await _medicationRepository.AddAsync(medication);

            var responseDto = _mapper.ToMedicationResponse(newMedication);

            await ApplyInteractionCheckAsync(newMedication, responseDto);

            return ServiceResult<MedicationResponse>.Success(responseDto);
        }

        // Prüft das neue Medikament gegen die übrigen aktiven Medikamente und hält fest,
        // ob die Prüfung vollständig, teilweise oder gar nicht laufen konnte
        private async Task ApplyInteractionCheckAsync(Medication newMedication, MedicationResponse responseDto)
        {
            var otherActiveMedications = (await _medicationRepository.FindAllByPatientIdAsync(newMedication.PatientId))
                .Where(m => m.Id != newMedication.Id && m.IsActiveOn(DateTime.UtcNow))
                .ToList();

            if (!otherActiveMedications.Any())
            {
                responseDto.InteractionCheckStatus = InteractionCheckStatus.NothingToCompare;
                return;
            }

            if (string.IsNullOrWhiteSpace(newMedication.AtcCode))
            {
                responseDto.InteractionCheckStatus = InteractionCheckStatus.NotCheckable;
                responseDto.InteractionCheckMessage = $"Für {newMedication.Name} ist kein ATC-Code hinterlegt.";
                return;
            }

            var uncheckedNames = otherActiveMedications
                .Where(m => string.IsNullOrWhiteSpace(m.AtcCode))
                .Select(m => m.Name)
                .ToList();

            var existingAtcCodes = otherActiveMedications
                .Where(m => !string.IsNullOrWhiteSpace(m.AtcCode))
                .Select(m => m.AtcCode!)
                .Distinct()
                .ToList();

            if (!existingAtcCodes.Any())
            {
                responseDto.InteractionCheckStatus = InteractionCheckStatus.NotCheckable;
                responseDto.InteractionCheckMessage = $"Für die übrigen Medikamente ist kein ATC-Code hinterlegt: {string.Join(", ", uncheckedNames)}.";
                return;
            }

            var interactionResult = await _drugInteractionService.CheckInteractionsAsync(newMedication.AtcCode, existingAtcCodes);

            if (!interactionResult.IsSuccess)
            {
                responseDto.InteractionCheckStatus = InteractionCheckStatus.NotCheckable;
                // Meldungen bei InternalServerError enthalten Exception-Details, die nicht an den Nutzer gehen
                responseDto.InteractionCheckMessage = interactionResult.ErrorType == ServiceErrorType.InternalServerError
                    ? "Die Wechselwirkungsprüfung ist fehlgeschlagen."
                    : interactionResult.ErrorMessage;
                return;
            }

            responseDto.InteractionWarnings = interactionResult.Data ?? new List<string>();

            if (uncheckedNames.Any())
            {
                responseDto.InteractionCheckStatus = InteractionCheckStatus.PartiallyChecked;
                responseDto.InteractionCheckMessage = $"Nicht geprüft, da kein ATC-Code hinterlegt ist: {string.Join(", ", uncheckedNames)}.";
                return;
            }

            responseDto.InteractionCheckStatus = InteractionCheckStatus.Checked;
        }

        public async Task<ServiceResult<MedicationResponse>> UpdateAsync(int patientId, int medicationId, UpdateMedicationRequest request, string? userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<MedicationResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (userId != null && patient.UserId != userId)
                return ServiceResult<MedicationResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var existingMedication = await _medicationRepository.FindByIdAsync(medicationId);

            if (existingMedication == null)
                return ServiceResult<MedicationResponse>.NotFound("Medikation existiert nicht.");

            if (existingMedication.PatientId != patientId)
                return ServiceResult<MedicationResponse>.NotFound("Medikation existiert nicht.");
            existingMedication.Name = request.Name;
            existingMedication.Dosage = request.Dosage;
            existingMedication.IntakeFrequency = request.IntakeFrequency;
            existingMedication.IntakeStartDate = request.IntakeStartDate;
            existingMedication.DurationInDays = request.DurationInDays;
            existingMedication.Indication = request.Indication;
            existingMedication.EntryBy = request.EntryBy;
            existingMedication.Notes = request.Notes;

            var updatedMedication = await _medicationRepository.UpdateAsync(existingMedication);
            return ServiceResult<MedicationResponse>.Success(_mapper.ToMedicationResponse(updatedMedication));
        }

        public async Task<ServiceResult> DeleteAsync(int medicationId, string? userId)
        {
            var existingMedication = await _medicationRepository.FindByIdAsync(medicationId);

            if (existingMedication == null)
                return ServiceResult.NotFound($"Medikament mit ID {medicationId} existiert nicht.");

            var patient = await _patientRepository.FindByIdAsync(existingMedication.PatientId);

            if (userId != null && (patient == null || patient.UserId != userId))
                return ServiceResult.Forbidden("Kein Zugriff auf dieses Medikament.");

            await _medicationRepository.DeleteAsync(existingMedication);
            return ServiceResult.Success();
        }
    }
}