namespace Backend.Application.Services.FamilyHistoryService.Dto
{
    public class FamilyHistoryEntryResponse
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string Relative { get; set; } = string.Empty;
        public string Diagnosis { get; set; } = string.Empty;
        public string? Comment { get; set; }
    }
}