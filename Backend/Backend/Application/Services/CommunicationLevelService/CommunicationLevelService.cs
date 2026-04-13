using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.CommunicationLevelService.Dto;
using Backend.Domain.Entities;
using Backend.src.CommunicationLevel;

namespace Backend.Application.Services.CommunicationLevelService
{
    public class CommunicationLevelService : ICommunicationLevelService
    {
        private readonly ICommunicationLevelRepository _communicationLevelRepository;
        private readonly IPatientRepository _patientRepository;

        public CommunicationLevelService(ICommunicationLevelRepository communicationLevelRepository, IPatientRepository patientRepository)
        {
            _communicationLevelRepository = communicationLevelRepository;
            _patientRepository = patientRepository;
        }

        public Task<ServiceResult<IEnumerable<CommunicationQuestionResponse>>> GetQuestionsAsync()
        {
            var questions = CommunicationLevelQuestions.Questions.Select(q => new CommunicationQuestionResponse
            {
                Id = q.Id,
                Text = q.Text,
                Answers = q.Answers.Select(a => new CommunicationAnswerResponse
                {
                    Id = a.Id,
                    Text = a.Text
                }).ToList()
            });

            return Task.FromResult(ServiceResult<IEnumerable<CommunicationQuestionResponse>>.Success(questions));
        }

        public async Task<ServiceResult<CommunicationLevelResponse>> CreateAsync(int patientId, CreateCommunicationLevelRequest request, string userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<CommunicationLevelResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (patient.UserId != userId)
                return ServiceResult<CommunicationLevelResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var level = CalculateLevel(request.SelectedAnswerIds);

            var existing = await _communicationLevelRepository.FindByPatientIdAsync(patientId);

            CommunicationLevel result;

            if (existing == null)
            {
                result = await _communicationLevelRepository.AddAsync(new CommunicationLevel
                {
                    PatientId = patientId,
                    Level = level,
                    CreatedAt = DateTime.UtcNow
                });
            }
            else
            {
                existing.Level = level;
                existing.CreatedAt = DateTime.UtcNow;
                result = await _communicationLevelRepository.UpdateAsync(existing);
            }

            return ServiceResult<CommunicationLevelResponse>.Success(ToResponse(result));
        }

        public async Task<ServiceResult<CommunicationLevelResponse>> GetByPatientIdAsync(int patientId, string userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);

            if (patient == null)
                return ServiceResult<CommunicationLevelResponse>.NotFound($"Patient {patientId} existiert nicht.");

            if (patient.UserId != userId)
                return ServiceResult<CommunicationLevelResponse>.Forbidden("Kein Zugriff auf diesen Patienten.");

            var communicationLevel = await _communicationLevelRepository.FindByPatientIdAsync(patientId);

            if (communicationLevel == null)
                return ServiceResult<CommunicationLevelResponse>.NotFound($"Kein Kommunikationslevel für Patient {patientId} gefunden.");

            return ServiceResult<CommunicationLevelResponse>.Success(ToResponse(communicationLevel));
        }

        private string CalculateLevel(List<int> selectedAnswerIds)
        {
            var allAnswers = CommunicationLevelQuestions.Questions
                .SelectMany(q => q.Answers);

            var selectedAnswers = allAnswers
                .Where(a => selectedAnswerIds.Contains(a.Id))
                .ToList();

            if (selectedAnswers.Count == 0)
                return "L1";

            var average = selectedAnswers.Average(a => a.Points);

            return average switch
            {
                <= 1.6 => "L1",
                <= 2.3 => "L2",
                _ => "L3"
            };
        }

        private CommunicationLevelResponse ToResponse(CommunicationLevel communicationLevel)
        {
            return new CommunicationLevelResponse
            {
                Id = communicationLevel.Id,
                PatientId = communicationLevel.PatientId,
                Level = communicationLevel.Level,
                CreatedAt = communicationLevel.CreatedAt
            };
        }
    }
}