namespace Backend.Application.Services.CommunicationLevelService.Dto
{
    public class CommunicationQuestionResponse
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<CommunicationAnswerResponse> Answers { get; set; } = new();
    }

    public class CommunicationAnswerResponse
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}