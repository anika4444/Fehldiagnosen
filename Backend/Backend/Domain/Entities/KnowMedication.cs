    namespace Backend.Domain.Entities
{
    namespace Backend.Domain.Entities
    {
        public class KnownMedication
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string? Wirkstoff { get; set; }
            public string? AtcCode { get; set; }
            public string? Staerke { get; set; }
            public string? Darreichungsform { get; set; }
            public string? Rezeptpflichtig { get; set; }
        }
    }
}
