namespace Backend.Domain.Entities
{
    public class CommunicationQuestion
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<CommunicationAnswer> Answers { get; set; } = new();
    }

    public class CommunicationAnswer
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Points { get; set; } // This is used for the calculation logic
    }
}
