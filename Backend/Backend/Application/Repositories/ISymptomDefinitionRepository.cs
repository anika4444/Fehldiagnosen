using Backend.Domain.Entities;
using Backend.Domain.Interfaces;

namespace Backend.Application.Repositories
{
    public interface ISymptomDefinitionRepository : IRepository<SymptomDefinition>
    {
        Task<IEnumerable<SymptomDefinition>> SearchByNameAsync(string name);
    }
}
