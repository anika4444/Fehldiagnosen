namespace Backend.Application.Services.AIService.Dto
{
    public sealed class MedicationScanResponse
    {
        public string? Brand { get; set; }
        public string? ProductName { get; set; }
        public string? ActiveIngredient { get; set; }
        public string? Dosage { get; set; }
        public string? Form { get; set; }
    }
}
