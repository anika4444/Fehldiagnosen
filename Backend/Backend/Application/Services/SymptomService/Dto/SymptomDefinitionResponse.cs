namespace Backend.Application.Services.SymptomService.Dto
{
    public class SymptomDefinitionResponse
    {
        public int Id { get; set; }
        
        public string Name { get; set; } = string.Empty;
        
        public List<string> Aliases { get; set; } = new();
        
        public List<SymptomFieldResponse> Fields { get; set; } = new();
    }
}
