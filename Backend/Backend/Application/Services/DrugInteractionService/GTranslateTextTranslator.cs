using GTranslate.Translators;

namespace Backend.Application.Services.DrugInteractionService
{
    public class GTranslateTextTranslator : ITextTranslator
    {
        private readonly AggregateTranslator _translator = new AggregateTranslator();

        public async Task<string> TranslateToGermanAsync(string text)
        {
            var translationResult = await _translator.TranslateAsync(text, "de", "en");
            return translationResult.Translation;
        }
    }
}
