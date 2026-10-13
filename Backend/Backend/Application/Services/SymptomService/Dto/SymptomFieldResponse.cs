namespace Backend.Application.Services.SymptomService.Dto
{
    public class SymptomFieldResponse
    {
        public string Name { get; set; } = string.Empty;
        
        public string Type { get; set; } = "text";
        
        public List<string?> Options { get; set; } = new();
        
        public bool IsRequired { get; set; }
    }
}
