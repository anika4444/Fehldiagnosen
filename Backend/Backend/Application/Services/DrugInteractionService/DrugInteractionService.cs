using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using GTranslate.Translators;

namespace Backend.Application.Services.DrugInteractionService
{
    public class DrugInteractionService:IDrugInteractionService
    {
        private readonly IDrugInteractionRepository _interactionRepository;
        private readonly AggregateTranslator _translator = new AggregateTranslator();

        public DrugInteractionService(IDrugInteractionRepository interactionRepository)
        {
            _interactionRepository = interactionRepository;
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
                            var translationResult = await _translator.TranslateAsync(interaction.Description, "de", "en");
                            finalDescription = translationResult.Translation;
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
    }
}
