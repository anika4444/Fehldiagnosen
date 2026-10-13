namespace Backend.Application.Services.CheckupService.Dto
{
    public sealed class CheckupSummaryRequest
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}