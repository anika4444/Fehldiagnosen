namespace Backend.Application.Services.AnonymizerService
{
    public interface IAnonymizerService
    {
        Task<string> AnonymizeTextAsync(string rawText);
    }
}
