namespace Backend.Application.Services.CommunicationLevelService.Dto
{
    public class CreateCommunicationLevelRequest
    {
        public List<int> SelectedAnswerIds { get; set; } = new();
    }
}