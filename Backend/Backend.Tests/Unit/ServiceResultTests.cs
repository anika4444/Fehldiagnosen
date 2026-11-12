using Backend.Application.Common.Results;

namespace Backend.Tests.Unit;

public class ServiceResultTests
{
    [Fact]
    public void Success_IsSuccessAndHasNoError()
    {
        var result = ServiceResult.Success();

        Assert.True(result.IsSuccess);
        Assert.Equal(ServiceErrorType.None, result.ErrorType);
        Assert.Null(result.ErrorMessage);
    }

    [Fact]
    public void GenericSuccess_ContainsData()
    {
        var result = ServiceResult<string>.Success("Daten");

        Assert.True(result.IsSuccess);
        Assert.Equal("Daten", result.Data);
        Assert.Null(result.ErrorMessage);
    }

    public static TheoryData<Func<string, ServiceResult>, ServiceErrorType> ErrorFactories => new()
    {
        { ServiceResult.NotFound, ServiceErrorType.NotFound },
        { ServiceResult.Conflict, ServiceErrorType.Conflict },
        { ServiceResult.Invalid, ServiceErrorType.ValidationError },
        { ServiceResult.Unauthorized, ServiceErrorType.Unauthorized },
        { ServiceResult.Forbidden, ServiceErrorType.Forbidden },
        { ServiceResult.InternalServerError, ServiceErrorType.InternalServerError },
    };

    [Theory]
    [MemberData(nameof(ErrorFactories))]
    public void ErrorFactory_SetsErrorTypeAndMessage(Func<string, ServiceResult> factory, ServiceErrorType expected)
    {
        var result = factory("Fehlertext");

        Assert.False(result.IsSuccess);
        Assert.Equal(expected, result.ErrorType);
        Assert.Equal("Fehlertext", result.ErrorMessage);
    }

    public static TheoryData<Func<string, ServiceResult<int>>, ServiceErrorType> GenericErrorFactories => new()
    {
        { ServiceResult<int>.NotFound, ServiceErrorType.NotFound },
        { ServiceResult<int>.Conflict, ServiceErrorType.Conflict },
        { ServiceResult<int>.Invalid, ServiceErrorType.ValidationError },
        { ServiceResult<int>.Unauthorized, ServiceErrorType.Unauthorized },
        { ServiceResult<int>.Forbidden, ServiceErrorType.Forbidden },
        { ServiceResult<int>.InternalServerError, ServiceErrorType.InternalServerError },
    };

    [Theory]
    [MemberData(nameof(GenericErrorFactories))]
    public void GenericErrorFactory_SetsErrorTypeAndHasNoData(Func<string, ServiceResult<int>> factory, ServiceErrorType expected)
    {
        var result = factory("Fehlertext");

        Assert.False(result.IsSuccess);
        Assert.Equal(expected, result.ErrorType);
        Assert.Equal("Fehlertext", result.ErrorMessage);
        Assert.Equal(default, result.Data);
    }
}
