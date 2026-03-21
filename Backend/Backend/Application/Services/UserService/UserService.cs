using Backend.Application.Common.Results;
using Backend.Application.Services.UserService.Dto;
using Backend.Domain.Entities;
using Backend.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Application.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly MySqlDbContext _dbContext;

        public UserService(UserManager<ApplicationUser> userManager, IConfiguration configuration, MySqlDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _dbContext = context;
        }

        public async Task<ServiceResult<Object>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

                var patient = await _dbContext.Patients.FirstOrDefaultAsync(p => p.UserId == user.Id);
                if (patient != null)
                {
                    authClaims.Add(new Claim("PatientId", patient.Id.ToString()));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings")["Secret"]));

                var token = new JwtSecurityToken(
                    expires: DateTime.UtcNow.AddMinutes(15),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

                return ServiceResult<Object>.Success(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    userId = user.Id,
                    patientId = patient.Id
                });
            }
            return ServiceResult<Object>.Unauthorized("Invalid username or password.");
        }

        public async Task<ServiceResult> Register(RegisterDto registerDto)
        {
            var userExists = await _userManager.FindByNameAsync(registerDto.UserName);

            if (userExists != null)
            {
                return ServiceResult.Conflict("User already exists.");
            }

            ApplicationUser user = new ApplicationUser()
            {
                Email = registerDto.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerDto.UserName
            };

            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return ServiceResult.Invalid("User creation failed! Please check user details and try again.");
            }

            if (!string.IsNullOrEmpty(registerDto.Role))
            {
                await _userManager.AddToRoleAsync(user, registerDto.Role);
            }

            if(registerDto.Role == "Patient")
            {
                var newPatient = new Patient
                {
                    UserId = user.Id,
                    ApplicationUser = user,
                    UserName = registerDto.UserName,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    DateOfBirth = registerDto.DateOfBirth,
                };

                _dbContext.Patients.Add(newPatient);
                await _dbContext.SaveChangesAsync();
            }

            return ServiceResult.Success();
        }
    }
}
