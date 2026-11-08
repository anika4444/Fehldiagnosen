namespace Backend.Application.Services.AIService.Dto
{
    public sealed class InterpretMedicalLetterResponse
    {
        public object? Extracted { get; set; }
        public object? Saved { get; set; }
    }
}
