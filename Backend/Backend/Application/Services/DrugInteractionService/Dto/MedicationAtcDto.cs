namespace Backend.Application.Services.DrugInteractionService.Dto
{
    // Input for the interaction check: display name plus ATC code
    public class MedicationAtcDto
    {
        public string Name { get; set; } = string.Empty;
        public string AtcCode { get; set; } = string.Empty;
    }
}
