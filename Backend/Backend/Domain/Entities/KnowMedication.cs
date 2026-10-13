    namespace Backend.Domain.Entities
{
    namespace Backend.Domain.Entities
    {
        public class KnownMedication
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public string? Substance { get; set; }
            public string? AtcCode { get; set; }
            public string? Dosage { get; set; }
            public string? PrescriptionRequired { get; set; }
        }
    }
}
