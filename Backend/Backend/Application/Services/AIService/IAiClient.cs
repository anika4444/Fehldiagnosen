namespace Backend.Application.Services.AIService
{
    public enum AiClientOutcome
    {
        Success,
        // Nicht erreichbar oder Antwort nicht lesbar
        Unavailable,
        // 422: Der KI-Service konnte das Ergebnis nicht validieren
        UnprocessableEntity,
        // Jede andere Antwort außerhalb von 2xx
        ErrorResponse
    }

    public sealed record AiClientResult<T>(AiClientOutcome Outcome, T? Data = default);

    public interface IAiClient
    {
        // timeout: null = Standard des HttpClient (100 Sekunden)
        Task<AiClientResult<T>> PostAsync<T>(string endpoint, object payload, TimeSpan? timeout = null);
    }
}
