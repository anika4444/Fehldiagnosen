using Backend.Application.Common.Results;
using Backend.Application.Repositories;
using Backend.Application.Services.DrugInteractionService;
using Backend.Domain.Entities;
using Moq;

namespace Backend.Tests.Unit;

public class DrugInteractionServiceTests
{
    private readonly Mock<IDrugInteractionRepository> _repository = new();
    private readonly Mock<ITextTranslator> _translator = new();
    private readonly DrugInteractionService _service;

    public DrugInteractionServiceTests()
    {
        // Standard: "Übersetzung" markiert den Text, damit man sie im Ergebnis erkennt
        _translator
            .Setup(t => t.TranslateToGermanAsync(It.IsAny<string>()))
            .ReturnsAsync((string text) => $"DE:{text}");

        _service = new DrugInteractionService(_repository.Object, _translator.Object);
    }

    private static DrugInteraction Interaction(string targetName, string description) => new()
    {
        SourceDrugBankId = "DB00001",
        TargetDrugBankId = "DB00002",
        TargetName = targetName,
        Description = description
    };

    #region CheckInteractionsAsync

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public async Task CheckInteractions_WithoutAtcCode_ReturnsInvalid(string atcCode)
    {
        var result = await _service.CheckInteractionsAsync(atcCode, ["B01AA03"]);

        Assert.Equal(ServiceErrorType.ValidationError, result.ErrorType);
        _repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task CheckInteractions_WithoutExistingMedications_ReturnsInvalid()
    {
        var result = await _service.CheckInteractionsAsync("N02BA01", []);

        Assert.Equal(ServiceErrorType.ValidationError, result.ErrorType);
        _repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task CheckInteractions_UnknownNewDrug_ReturnsNotFound()
    {
        _repository.Setup(r => r.GetDrugBankIdByAtcCodeAsync("N02BA01")).ReturnsAsync((string?)null);

        var result = await _service.CheckInteractionsAsync("N02BA01", ["B01AA03"]);

        Assert.Equal(ServiceErrorType.NotFound, result.ErrorType);
    }

    [Fact]
    public async Task CheckInteractions_UnknownExistingDrugs_ReturnsNotFound()
    {
        _repository.Setup(r => r.GetDrugBankIdByAtcCodeAsync("N02BA01")).ReturnsAsync("DB00945");
        _repository.Setup(r => r.GetDrugBankIdsByAtcCodesAsync(It.IsAny<List<string>>())).ReturnsAsync([]);

        var result = await _service.CheckInteractionsAsync("N02BA01", ["B01AA03"]);

        Assert.Equal(ServiceErrorType.NotFound, result.ErrorType);
    }

    [Fact]
    public async Task CheckInteractions_RemovesDuplicatesAndTranslatesDescription()
    {
        _repository.Setup(r => r.GetDrugBankIdByAtcCodeAsync("N02BA01")).ReturnsAsync("DB00945");
        _repository.Setup(r => r.GetDrugBankIdsByAtcCodesAsync(It.IsAny<List<string>>())).ReturnsAsync(["DB00682"]);
        _repository.Setup(r => r.GetInteractionsAsync("DB00945", It.Is<List<string>>(l => l.Contains("DB00682"))))
            .ReturnsAsync([
                Interaction("Warfarin", "Increased bleeding risk"),
                Interaction("Warfarin", "Increased bleeding risk"),
                Interaction("Ibuprofen", "Reduced effect")
            ]);

        var result = await _service.CheckInteractionsAsync("N02BA01", ["B01AA03"]);

        Assert.True(result.IsSuccess);
        Assert.Equal(
            [
                "[WARNUNG] Wechselwirkung mit Warfarin: DE:Increased bleeding risk",
                "[WARNUNG] Wechselwirkung mit Ibuprofen: DE:Reduced effect"
            ],
            result.Data);
    }

    [Fact]
    public async Task CheckInteractions_TranslationFails_KeepsOriginalText()
    {
        _translator
            .Setup(t => t.TranslateToGermanAsync(It.IsAny<string>()))
            .ThrowsAsync(new HttpRequestException("offline"));
        _repository.Setup(r => r.GetDrugBankIdByAtcCodeAsync("N02BA01")).ReturnsAsync("DB00945");
        _repository.Setup(r => r.GetDrugBankIdsByAtcCodesAsync(It.IsAny<List<string>>())).ReturnsAsync(["DB00682"]);
        _repository.Setup(r => r.GetInteractionsAsync(It.IsAny<string>(), It.IsAny<List<string>>()))
            .ReturnsAsync([Interaction("Warfarin", "Increased bleeding risk")]);

        var result = await _service.CheckInteractionsAsync("N02BA01", ["B01AA03"]);

        Assert.True(result.IsSuccess);
        Assert.Equal(["[WARNUNG] Wechselwirkung mit Warfarin: Increased bleeding risk"], result.Data);
    }

    [Fact]
    public async Task CheckInteractions_RepositoryThrows_ReturnsInternalServerError()
    {
        _repository.Setup(r => r.GetDrugBankIdByAtcCodeAsync(It.IsAny<string>()))
            .ThrowsAsync(new InvalidOperationException("DB weg"));

        var result = await _service.CheckInteractionsAsync("N02BA01", ["B01AA03"]);

        Assert.Equal(ServiceErrorType.InternalServerError, result.ErrorType);
        Assert.Contains("DB weg", result.ErrorMessage);
    }

    #endregion

    #region GetAllPatientRisksAsync

    [Fact]
    public async Task GetAllPatientRisks_WithoutMedications_ReturnsEmptyResult()
    {
        var result = await _service.GetAllPatientRisksAsync([]);

        Assert.True(result.IsSuccess);
        Assert.Empty(result.Data!.Interactions);
        Assert.Empty(result.Data.SideEffects);
        _repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task GetAllPatientRisks_UnknownAtcCodes_ReturnsEmptyResult()
    {
        _repository.Setup(r => r.GetDrugBankIdsByAtcCodesAsync(It.IsAny<List<string>>())).ReturnsAsync([]);

        var result = await _service.GetAllPatientRisksAsync(["X99"]);

        Assert.True(result.IsSuccess);
        Assert.Empty(result.Data!.Interactions);
        Assert.Empty(result.Data.SideEffects);
    }

    [Fact]
    public async Task GetAllPatientRisks_CollectsInteractionsAndSideEffects()
    {
        _repository.Setup(r => r.GetDrugBankIdsByAtcCodesAsync(It.IsAny<List<string>>())).ReturnsAsync(["DB1", "DB2"]);
        _repository.Setup(r => r.GetInteractionsAmongAsync(It.IsAny<List<string>>()))
            .ReturnsAsync([
                Interaction("Warfarin", "Bleeding"),
                Interaction("Warfarin", "Bleeding")
            ]);
        _repository.Setup(r => r.GetDrugDetailsAsync(It.IsAny<List<string>>()))
            .ReturnsAsync([
                new DrugDetail { DrugBankId = "DB1", Toxicity = "Liver damage", Pharmacodynamics = "Inhibits COX" },
                new DrugDetail { DrugBankId = "DB2", Toxicity = null, Pharmacodynamics = "  " }
            ]);

        var result = await _service.GetAllPatientRisksAsync(["N02BA01", "B01AA03"]);

        Assert.True(result.IsSuccess);
        Assert.Equal(["[WECHSELWIRKUNG] mit Warfarin: DE:Bleeding"], result.Data!.Interactions);

        // DB2 hat keine Infos und taucht daher nicht auf
        var sideEffect = Assert.Single(result.Data.SideEffects);
        Assert.StartsWith("[INFOS FÜR MEDIKAMENT DB1]:", sideEffect);
        Assert.Contains("Toxizität/Nebenwirkungen: DE:Liver damage", sideEffect);
        Assert.Contains("Warnhinweise: DE:Inhibits COX", sideEffect);
    }

    #endregion
}
