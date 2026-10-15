namespace Backend.Application.Services.DrugInteractionService.Dto
{
    // Result of an interaction check. Medications that could not be checked are listed,
    // so an empty list of pairs is never mistaken for "checked and nothing found".
    public class InteractionCheckResultDto
    {
        public List<InteractionPairDto> Pairs { get; set; } = new();
        public List<string> UncheckedMedications { get; set; } = new();
    }
}
