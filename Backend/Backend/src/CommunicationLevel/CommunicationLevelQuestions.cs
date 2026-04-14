namespace Backend.src.CommunicationLevel
{
    public static class CommunicationLevelQuestions
    {
        public static readonly List<CommunicationQuestion> Questions = new()
        {
            new CommunicationQuestion
            {
                Id = 1,
                Text = "Wie sicher fühlen Sie sich mit medizinischen Fachbegriffen?",
                Answers = new List<CommunicationAnswer>
                {
                    new CommunicationAnswer { Id = 1, Text = "Ich kenne mich gar nicht aus – bitte erklären Sie es mir wie einem Laien.", Points = 1 },
                    new CommunicationAnswer { Id = 2, Text = "Ich kenne die Grundlagen meiner Gesundheit ganz gut.", Points = 2 },
                    new CommunicationAnswer { Id = 3, Text = "Ich habe beruflich mit Medizin zu tun oder bin sehr tief im Thema.", Points = 3 }
                }
            },
            new CommunicationQuestion
            {
                Id = 2,
                Text = "Welche Art der Erklärung hilft Ihnen am meisten?",
                Answers = new List<CommunicationAnswer>
                {
                    new CommunicationAnswer { Id = 1, Text = "Einfache Beispiele und Bilder aus dem Alltag.", Points = 1 },
                    new CommunicationAnswer { Id = 2, Text = "Ein strukturierter Überblick über die wichtigsten Fakten.", Points = 2 },
                    new CommunicationAnswer { Id = 3, Text = "Detaillierte medizinische Hintergründe und genaue Daten.", Points = 3 }
                }
            },
            new CommunicationQuestion
            {
                Id = 3,
                Text = "Worauf soll die KI bei der Erklärung den Fokus legen?",
                Answers = new List<CommunicationAnswer>
                {
                    new CommunicationAnswer { Id = 1, Text = "Wie sich die Diagnose auf mein tägliches Leben auswirkt.", Points = 1 },
                    new CommunicationAnswer { Id = 2, Text = "Was genau in meinem Körper passiert (Ursache-Wirkung).", Points = 2 },
                    new CommunicationAnswer { Id = 3, Text = "Die klinischen Details und Behandlungsoptionen.", Points = 3 }
                }
            }
        };
    }

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
        public int Points { get; set; }
    }
}