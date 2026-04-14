namespace Backend.Application.Services.CommunicationLevelService.Dto
{
    public class CommunicationLevelResponse
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string Level { get; set; } = string.Empty;
        public string ActionRecommendation { get; set; } = string.Empty;
    }
}