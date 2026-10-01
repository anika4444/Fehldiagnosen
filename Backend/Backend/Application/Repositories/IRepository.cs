using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        Task<List<TEntity>> FindAllAsync();

        Task<TEntity?> FindByIdAsync(int id);

        Task<TEntity> AddAsync(TEntity entity);

        Task<TEntity> UpdateAsync(TEntity entity);
        
        Task<TEntity> DeleteAsync(TEntity entity);
    }
}