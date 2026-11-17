namespace Backend.Application.Services.DrugInteractionService.Dto
{
    public class MedicationRiskDto
    {
        public List<string> Interactions { get; set; } = new List<string>();
        public List<string> SideEffects { get; set; } = new List<string>();
    }
}
