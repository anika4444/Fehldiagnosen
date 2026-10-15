using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.DrugInteractionService.Dto;

namespace Backend.Application.Services.DrugInteractionService
{
    public class DrugInteractionService:IDrugInteractionService
    {
        private readonly IDrugInteractionRepository _interactionRepository;
        private readonly ITextTranslator _translator;

        public DrugInteractionService(IDrugInteractionRepository interactionRepository, ITextTranslator translator)
        {
            _interactionRepository = interactionRepository;
            _translator = translator;
        }

        public async Task<ServiceResult<List<string>>> CheckInteractionsAsync(string newAtcCode, List<string> existingAtcCodes)
        {
            try
            {
                var warnings = new List<string>();

                if (string.IsNullOrWhiteSpace(newAtcCode))
                {
                    return ServiceResult<List<string>>.Invalid("Es wurde kein richtiger ATC Code gefunden.");
                }

                if (existingAtcCodes == null || !existingAtcCodes.Any())
                {
                    return ServiceResult<List<string>>.Invalid("Es gibt keine existierende Medikamente.");
                }

                var newDrugBankId = await _interactionRepository.GetDrugBankIdByAtcCodeAsync(newAtcCode);
                if (string.IsNullOrEmpty(newDrugBankId))
                {
                    return ServiceResult<List<string>>.NotFound("Das neue Medikament konnte nicht gefunden werden.");
                }

                var existingDrugBankIds = await _interactionRepository.GetDrugBankIdsByAtcCodesAsync(existingAtcCodes);
                if (!existingDrugBankIds.Any())
                {
                    return ServiceResult<List<string>>.NotFound("Es konnten keine existierende Medikamente gefunden werden.");
                }

                var interactions = await _interactionRepository.GetInteractionsAsync(newDrugBankId, existingDrugBankIds);

                var uniqueInteractions = interactions
                    .GroupBy(i => new { i.TargetName, i.Description })
                    .Select(g => g.First());

                foreach (var interaction in uniqueInteractions)
                {
                    string finalDescription = interaction.Description;

                    if(!string.IsNullOrWhiteSpace(interaction.Description))
                    {
                        try
                        {
                            finalDescription = await _translator.TranslateToGermanAsync(interaction.Description);
                        }
                        catch
                        {
                            finalDescription = interaction.Description;
                        }
                    }

                    warnings.Add($"[WARNUNG] Wechselwirkung mit {interaction.TargetName}: {finalDescription}");
                }

                return ServiceResult<List<string>>.Success(warnings);
            }
            catch (Exception ex)
            {
                return ServiceResult<List<string>>.InternalServerError($"Fehler bei der Wechselwirkungsprüfung: {ex.Message}");
            }
        }

        public async Task<ServiceResult<bool>> ImportDrugDataAsync(string xmlFilePath)
        {
            try
            {
                if (!File.Exists(xmlFilePath))
                {
                    return ServiceResult<bool>.NotFound("Die angegebene XML-Datei wurde nicht gefunden.");
                }

                await Task.Run(async () =>
                {
                    await _interactionRepository.RebuildFromXmlAsync(xmlFilePath);
                });

                return ServiceResult<bool>.Success(true);
            }
            catch (Exception ex)
            {
                return ServiceResult<bool>.InternalServerError($"Fehler beim Importieren der Medikamentendaten: {ex.Message}");
            }
        }

        public async Task<ServiceResult<MedicationRiskDto>> GetAllPatientRisksAsync(List<string> currentAtcCodes)
        {
            try
            {
                if (currentAtcCodes == null || !currentAtcCodes.Any())
                {
                    return ServiceResult<MedicationRiskDto>.Success(new MedicationRiskDto());
                }

                var resultDto = new MedicationRiskDto();

                var drugBankIds = await _interactionRepository.GetDrugBankIdsByAtcCodesAsync(currentAtcCodes);
                if (!drugBankIds.Any())
                {
                    return ServiceResult<MedicationRiskDto>.Success(resultDto);
                }

                var interactions = await _interactionRepository.GetInteractionsAmongAsync(drugBankIds);

                var uniqueInteractions = interactions
                    .GroupBy(i => new { i.TargetName, i.Description })
                    .Select(g => g.First());

                foreach (var interaction in uniqueInteractions)
                {
                    var translatedDesc = await TranslateSafeAsync(interaction.Description);
                    resultDto.Interactions.Add($"[WECHSELWIRKUNG] mit {interaction.TargetName}: {translatedDesc}");
                }

                var drugDetails = await _interactionRepository.GetDrugDetailsAsync(drugBankIds);

                foreach (var detail in drugDetails)
                {
                    var combinedInfo = new System.Text.StringBuilder();

                    if (!string.IsNullOrWhiteSpace(detail.Toxicity))
                    {
                        var translatedTox = await TranslateSafeAsync(detail.Toxicity);
                        combinedInfo.AppendLine($"Toxizität/Nebenwirkungen: {translatedTox}");
                    }

                    if (!string.IsNullOrWhiteSpace(detail.Pharmacodynamics))
                    {
                        var translatedPharma = await TranslateSafeAsync(detail.Pharmacodynamics);
                        combinedInfo.AppendLine($"Warnhinweise: {translatedPharma}");
                    }

                    if (combinedInfo.Length > 0)
                    {
                        resultDto.SideEffects.Add($"[INFOS FÜR MEDIKAMENT {detail.DrugBankId}]:\n{combinedInfo.ToString().Trim()}");
                    }
                }

                return ServiceResult<MedicationRiskDto>.Success(resultDto);
            }
            catch (Exception ex)
            {
                return ServiceResult<MedicationRiskDto>.InternalServerError($"Fehler beim Abrufen der Risiken: {ex.Message}");
            }
        }

        // All interactions among the given medications, with both names so the reader knows the pair
        public async Task<ServiceResult<InteractionCheckResultDto>> GetInteractionPairsAsync(List<MedicationAtcDto> medications)
        {
            try
            {
                var nameByDrugBankId = new Dictionary<string, string>();
                var uncheckedNames = new List<string>();

                foreach (var medication in medications)
                {
                    var drugBankId = string.IsNullOrWhiteSpace(medication.AtcCode)
                        ? null
                        : await _interactionRepository.GetDrugBankIdByAtcCodeAsync(medication.AtcCode);

                    // Without a DrugBank match the medication cannot be checked, the reader must know that
                    if (string.IsNullOrEmpty(drugBankId))
                        uncheckedNames.Add(medication.Name);
                    else if (!nameByDrugBankId.ContainsKey(drugBankId))
                        nameByDrugBankId[drugBankId] = medication.Name;
                }

                if (nameByDrugBankId.Count < 2)
                    return ServiceResult<InteractionCheckResultDto>.Success(new InteractionCheckResultDto { UncheckedMedications = uncheckedNames });

                var interactions = await _interactionRepository.GetInteractionsAmongAsync(nameByDrugBankId.Keys.ToList());
                var seenPairs = new HashSet<string>();
                var result = new List<InteractionPairDto>();

                foreach (var interaction in interactions)
                {
                    if (!nameByDrugBankId.TryGetValue(interaction.SourceDrugBankId, out var sourceName)) continue;
                    if (!nameByDrugBankId.TryGetValue(interaction.TargetDrugBankId, out var targetName)) continue;

                    // DrugBank lists A with B and B with A, keep one of them
                    var pairKey = string.CompareOrdinal(interaction.SourceDrugBankId, interaction.TargetDrugBankId) < 0
                        ? $"{interaction.SourceDrugBankId}|{interaction.TargetDrugBankId}"
                        : $"{interaction.TargetDrugBankId}|{interaction.SourceDrugBankId}";

                    if (!seenPairs.Add(pairKey)) continue;

                    result.Add(new InteractionPairDto
                    {
                        MedicationA = sourceName,
                        MedicationB = targetName,
                        Description = interaction.Description
                    });
                }

                // Translate in parallel with a time limit, a slow translator must not block the emergency page.
                // If it does not answer in time, the original English text is shown.
                await Task.WhenAll(result.Select(async pair =>
                    pair.Description = await TranslateWithTimeoutAsync(pair.Description)));

                return ServiceResult<InteractionCheckResultDto>.Success(new InteractionCheckResultDto
                {
                    Pairs = result,
                    UncheckedMedications = uncheckedNames
                });
            }
            catch (Exception ex)
            {
                return ServiceResult<InteractionCheckResultDto>.InternalServerError($"Fehler bei der Wechselwirkungsprüfung: {ex.Message}");
            }
        }

        private async Task<string> TranslateWithTimeoutAsync(string text)
        {
            var translation = TranslateSafeAsync(text);
            var finished = await Task.WhenAny(translation, Task.Delay(TimeSpan.FromSeconds(4)));
            return finished == translation ? await translation : text;
        }

        private async Task<string> TranslateSafeAsync(string? text)
        {
            if (string.IsNullOrWhiteSpace(text)) return string.Empty;

            try
            {
                return await _translator.TranslateToGermanAsync(text);
            }
            catch
            {
                return text;
            }
        }
    }
}
