using Backend.Application.Common.Results;

namespace Backend.Application.Services.HealthTipService
{
    public interface IHealthTipService
    {
        ServiceResult<string> GetTodayHealthTipAsync();
    }
}
