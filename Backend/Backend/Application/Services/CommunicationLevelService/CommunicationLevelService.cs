using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.CommunicationLevelService.Dto;
using Backend.Domain.Entities;
using System.Text.Json;

namespace Backend.Application.Services.CommunicationLevelService
{
    public class CommunicationLevelService : ICommunicationLevelService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly ICommunicationLevelRepository _levelRepository;
        private readonly List<CommunicationQuestion> _questions;

        public CommunicationLevelService(IPatientRepository patientRepository, ICommunicationLevelRepository levelRepository)
        {
            _patientRepository = patientRepository;
            _levelRepository = levelRepository;

            var filePath = Path.Combine(AppContext.BaseDirectory, "src", "CommunicationLevel", "communication_questions.json");

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"Could not find the questions file at: {filePath}");
            }

            var json = File.ReadAllText(filePath);
            _questions = JsonSerializer.Deserialize<List<CommunicationQuestion>>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new();
        }

        public Task<ServiceResult<IEnumerable<CommunicationQuestionResponse>>> GetQuestionsAsync()
        {
            var response = _questions.Select(q => new CommunicationQuestionResponse
            {
                Id = q.Id,
                Text = q.Text,
                Answers = q.Answers.Select(a => new CommunicationAnswerResponse
                {
                    Id = a.Id,
                    Text = a.Text
                }).ToList()
            });

            return Task.FromResult(ServiceResult<IEnumerable<CommunicationQuestionResponse>>.Success(response));
        }


        public async Task<ServiceResult<CommunicationLevelResponse>> CreateAsync(int patientId, CreateCommunicationLevelRequest request, string userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            if (patient == null) return ServiceResult<CommunicationLevelResponse>.NotFound("Patient not found.");
            if (patient.UserId != userId) return ServiceResult<CommunicationLevelResponse>.Forbidden("Access denied.");

            // Calculate key (L1, L2, or L3) based on average points
            var levelKey = CalculateLevelKey(request.SelectedAnswerIds);

            // Find the corresponding Entity in our Lookup table
            var levelEntity = await _levelRepository.FindByNameAsync(levelKey);
            if (levelEntity == null) return ServiceResult<CommunicationLevelResponse>.Conflict("Database error: Level not defined.");

            // Update the patient's foreign key
            patient.CommunicationLevelId = levelEntity.Id;
            await _patientRepository.UpdateAsync(patient);

            return ServiceResult<CommunicationLevelResponse>.Success(new CommunicationLevelResponse
            {
                Id = levelEntity.Id,
                PatientId = patient.Id,
                LevelName = levelEntity.Name,
                LevelDescription = levelEntity.Description,
                ActionRecommendation = levelEntity.ActionRecommendation
            });
        }

        public async Task<ServiceResult<CommunicationLevelResponse>> GetByPatientIdAsync(int patientId, string userId)
        {
            var patient = await _patientRepository.FindByIdAsync(patientId);
            if (patient == null) return ServiceResult<CommunicationLevelResponse>.NotFound("Patient not found.");
            if (patient.UserId != userId) return ServiceResult<CommunicationLevelResponse>.Forbidden("Access denied.");

            var communicationLevel = await _levelRepository.FindByPatientIdAsync(patientId);
            if (communicationLevel == null)
                return ServiceResult<CommunicationLevelResponse>.NotFound("No level assigned.");

            return ServiceResult<CommunicationLevelResponse>.Success(new CommunicationLevelResponse
            {
                Id = communicationLevel.Id,
                PatientId = patient.Id,
                LevelName = communicationLevel.Name,
                LevelDescription = communicationLevel.Description,
                ActionRecommendation = communicationLevel.ActionRecommendation
            });
        }

        private string CalculateLevelKey(List<int> selectedAnswerIds)
        {
            var selectedPoints = _questions.SelectMany(q => q.Answers)
                .Where(a => selectedAnswerIds.Contains(a.Id))
                .Select(a => a.Points).ToList();

            if (!selectedPoints.Any()) return "L1";
            var avg = selectedPoints.Average();

            return avg <= 1.6 ? "L1" : avg <= 2.3 ? "L2" : "L3";
        }

    }
}