using Backend.Application.Services.DrugInteractionService.Dto;

namespace Backend.Application.Services.EmergencyDataService.Dto
{
    // Slower parts loaded after the core data so the first screen stays fast
    public class EmergencyInsightsResponse
    {
        public List<InteractionPairDto>? Interactions { get; set; }

        // True when the check failed, so an empty list is never mistaken for "no interactions"
        public bool InteractionsUnavailable { get; set; }

        // Current medications without ATC code cannot be checked against DrugBank
        public List<string> UncheckedMedications { get; set; } = new();

        public string? AiSummary { get; set; }
        public string? AiDisclaimer { get; set; }
        public bool AiUnavailable { get; set; }
    }
}
