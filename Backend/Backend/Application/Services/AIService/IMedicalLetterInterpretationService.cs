using Backend.Application.Common.Results;
using Backend.Application.Services.AIService.Dto;
using Backend.Domain.Enums;

namespace Backend.Application.Services.AIService
{
    public interface IMedicalLetterInterpretationService
    {
        // letterText muss bereits anonymisiert sein
        Task<ServiceResult<InterpretMedicalLetterResponse>> InterpretMedicalLetter(int patientId, string? userId, EntryBy entryBy, string letterText);
    }
}
