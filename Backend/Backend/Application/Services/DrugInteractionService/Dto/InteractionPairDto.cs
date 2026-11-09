namespace Backend.Application.Services.DrugInteractionService.Dto
{
    // One interaction between two medications of the same patient
    public class InteractionPairDto
    {
        public string MedicationA { get; set; } = string.Empty;
        public string MedicationB { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
