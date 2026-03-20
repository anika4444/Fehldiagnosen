using Backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend.Infrastructure.Repositories
{
    public static class DbInitializer
    {
        public static async Task Initialize(MySqlDbContext context, RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

            string[] roleNames = { "Patient", "Arzt" };
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
    }
}
