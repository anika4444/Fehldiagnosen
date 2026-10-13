namespace Backend.Application.Services.FamilyHistoryService.Dto
{
    public class CreateFamilyHistoryEntryRequest
    {
        public string Relative { get; set; } = string.Empty;
        
        public string Diagnosis { get; set; } = string.Empty;
        
        public string? Comment { get; set; }
    }
}