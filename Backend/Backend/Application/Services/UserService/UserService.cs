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
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly MySqlDbContext _dbContext;

        public UserService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, MySqlDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
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
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

                var patient = await _dbContext.Patients.FirstOrDefaultAsync(p => p.UserId == user.Id);
                if (patient != null)
                {
                    authClaims.Add(new Claim("PatientId", patient.Id.ToString()));
                }

                var doctor = await _dbContext.Doctors.FirstOrDefaultAsync(d => d.UserId == user.Id);
                if (doctor != null)
                {
                    authClaims.Add(new Claim("DoctorId", doctor.Id.ToString()));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings")["Secret"]));

                var token = new JwtSecurityToken(
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

                return ServiceResult<Object>.Success(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    userId = user.Id,
                    patientId = patient?.Id,
                    doctorId = doctor?.Id
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
                if (registerDto.Role.Equals("Patient", StringComparison.OrdinalIgnoreCase))
                    registerDto.Role = "Patient";
                else if (registerDto.Role.Equals("Arzt", StringComparison.OrdinalIgnoreCase))
                    registerDto.Role = "Arzt";

                if (!await _roleManager.RoleExistsAsync(registerDto.Role))
                    await _roleManager.CreateAsync(new IdentityRole(registerDto.Role));

                await _userManager.AddToRoleAsync(user, registerDto.Role);
            }

            if (registerDto.Role == "Patient")
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

            if (registerDto.Role == "Arzt")
            {
                var newDoctor = new Doctor
                {
                    UserId = user.Id,
                    ApplicationUser = user,
                    UserName = registerDto.UserName,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    Specialization = registerDto.Specialization ?? string.Empty,
                    LicenseNumber = registerDto.LicenseNumber ?? string.Empty
                };

                _dbContext.Doctors.Add(newDoctor);
                await _dbContext.SaveChangesAsync();
            }

            return ServiceResult.Success();
        }
    }
}