namespace Backend.Application.Services.DrugInteractionService
{
    public interface ITextTranslator
    {
        // Übersetzt einen englischen Text ins Deutsche
        Task<string> TranslateToGermanAsync(string text);
    }
}
