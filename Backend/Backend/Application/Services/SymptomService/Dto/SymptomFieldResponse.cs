namespace Backend.Application.Services.SymptomService.Dto
{
    public class SymptomFieldResponse
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = "text";
        public bool Required { get; set; }
    }
}
