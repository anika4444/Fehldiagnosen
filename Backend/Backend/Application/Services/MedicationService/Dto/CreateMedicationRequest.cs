namespace Backend.Application.Services.MedicationService.Dto
{
    public class CreateMedicationRequest
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}