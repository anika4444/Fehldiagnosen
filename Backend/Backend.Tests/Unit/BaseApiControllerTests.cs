using System.Security.Claims;
using Backend.Api.Controller;
using Backend.Application.Common.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Tests.Unit;

public class BaseApiControllerTests
{
    // Macht die geschützten Methoden des BaseApiController testbar
    private sealed class TestController : BaseApiController
    {
        public TestController(ClaimsPrincipal user)
        {
            ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = user }
            };
        }

        public ActionResult CallHandleServiceError(ServiceErrorType type, string? message) => HandleServiceError(type, message);
        public string CallGetCurrentUserId() => GetCurrentUserId();
        public bool CallIsArzt() => IsArzt();
    }

    private static TestController CreateController(params Claim[] claims) =>
        new(new ClaimsPrincipal(new ClaimsIdentity(claims, "Test")));

    [Theory]
    [InlineData(ServiceErrorType.NotFound, StatusCodes.Status404NotFound)]
    [InlineData(ServiceErrorType.Unauthorized, StatusCodes.Status401Unauthorized)]
    [InlineData(ServiceErrorType.Conflict, StatusCodes.Status409Conflict)]
    [InlineData(ServiceErrorType.ValidationError, StatusCodes.Status400BadRequest)]
    // Aktuelles Verhalten: interne Fehler werden als 400 ausgeliefert
    [InlineData(ServiceErrorType.InternalServerError, StatusCodes.Status400BadRequest)]
    public void HandleServiceError_MapsErrorTypeToStatusCodeAndMessage(ServiceErrorType type, int expectedStatus)
    {
        var controller = CreateController();

        var result = controller.CallHandleServiceError(type, "Fehlertext");

        var objectResult = Assert.IsAssignableFrom<ObjectResult>(result);
        Assert.Equal(expectedStatus, objectResult.StatusCode);
        Assert.Equal("Fehlertext", objectResult.Value);
    }

    [Fact]
    public void HandleServiceError_Forbidden_ReturnsForbidResult()
    {
        var controller = CreateController();

        var result = controller.CallHandleServiceError(ServiceErrorType.Forbidden, "Kein Zugriff");

        Assert.IsType<ForbidResult>(result);
    }

    [Fact]
    public void GetCurrentUserId_ReturnsNameIdentifierClaim()
    {
        var controller = CreateController(new Claim(ClaimTypes.NameIdentifier, "user-123"));

        Assert.Equal("user-123", controller.CallGetCurrentUserId());
    }

    [Fact]
    public void GetCurrentUserId_WithoutClaim_Throws()
    {
        var controller = CreateController();

        Assert.Throws<InvalidOperationException>(() => controller.CallGetCurrentUserId());
    }

    [Theory]
    [InlineData("Arzt", true)]
    [InlineData("Patient", false)]
    public void IsArzt_DependsOnRole(string role, bool expected)
    {
        var controller = CreateController(new Claim(ClaimTypes.Role, role));

        Assert.Equal(expected, controller.CallIsArzt());
    }
}
