using Backend.Application.Common.Results;
using Backend.Application.Services.UserService.Dto;

namespace Backend.Application.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResult> Register(RegisterDto registerDto);
        Task<ServiceResult<Object>> Login(LoginDto loginDto);
    }
}
