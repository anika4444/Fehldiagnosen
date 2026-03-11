namespace Backend.Application.Services.MedicationService.Dto
{
    public class MedicationResponse
    {
        //ist eigentlich in diesem Fall genau das gleiche wie das ganze Objekt falls noch Erweiterungen dazu kommen ist ein Response dennoch sinvoll.
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}