using System.Net;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Backend.Application.Services.AIService
{
    public class AiClient : IAiClient
    {
        // Node liefert Enums als Namen (z.B. conditionStatus = "Active")
        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new JsonStringEnumConverter() }
        };

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<AiClient> _logger;

        public AiClient(IHttpClientFactory httpClientFactory, ILogger<AiClient> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        public async Task<AiClientResult<T>> PostAsync<T>(string endpoint, object payload, TimeSpan? timeout = null)
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                if (timeout.HasValue)
                {
                    httpClient.Timeout = timeout.Value;
                }

                using var response = await httpClient.PostAsJsonAsync(endpoint, payload);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("KI-Service antwortete mit Status {StatusCode}", (int)response.StatusCode);

                    return new AiClientResult<T>(response.StatusCode == HttpStatusCode.UnprocessableEntity
                        ? AiClientOutcome.UnprocessableEntity
                        : AiClientOutcome.ErrorResponse);
                }

                var data = await response.Content.ReadFromJsonAsync<T>(JsonOptions);
                return new AiClientResult<T>(AiClientOutcome.Success, data);
            }
            catch (Exception ex)
            {
                // Nur der Typ: Ausnahmetexte können Inhalte aus der KI-Antwort enthalten
                _logger.LogError("KI-Aufruf fehlgeschlagen: {ExceptionType}", ex.GetType().Name);
                return new AiClientResult<T>(AiClientOutcome.Unavailable);
            }
        }
    }
}
