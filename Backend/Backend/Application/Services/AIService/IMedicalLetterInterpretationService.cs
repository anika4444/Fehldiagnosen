using Backend.Application.Common.Results;
using Backend.Application.Services.AIService.Dto;
using Backend.Application.Services.TextExtractionService;
using Backend.Domain.Enums;

namespace Backend.Application.Services.AIService
{
    public interface IMedicalLetterInterpretationService
    {
        // Ablauf: Zugriff prüfen → Text erkennen → anonymisieren → KI-Auswertung → Diagnose speichern.
        // Rohtext geht nie direkt an die KI, deshalb gibt es keinen öffentlichen Einstieg mit Text.
        Task<ServiceResult<InterpretMedicalLetterResponse>> ScanMedicalLetter(int patientId, string? userId, EntryBy entryBy, byte[] content, DocumentFormat format);
    }
}
