using Backend.Application.Common.Results;

namespace Backend.Application.Services.AIService
{
    public interface IAIService
    {
        Task<ServiceResult<AiExplainResponse>> ExplainDiagnosis(int id, string? userId, int diagnosisId);
        
        Task<ServiceResult<MedicationScanResponse>> InterpretMedicationImage(string base64,string mimeType);
        
        Task<ServiceResult<InterpretMedicalLetterResponse>> InterpretMedicalLetter(int? patientId, string? userId, string letterText);
    }
}

public sealed class InterpretMedicalLetterResponse
{
    public object? Extracted { get; set; }
    public object? Saved { get; set; }
}
