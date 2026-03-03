using Backend.Domain.Entities;

namespace Backend.Domain.Interfaces
{
    
    public interface IRepository<TEntity> where TEntity : class, IEntity
    {
        //Gets all entries of this type
        Task<List<TEntity>> FindAllAsync();

        //Search for a specific patient by id
        Task<TEntity?> FindByIdAsync(int id);

        //Save new Dataset
        Task<TEntity> AddAsync(TEntity entity);

        //Update existing
        Task<TEntity> UpdateAsync(TEntity entity);
        
        //Delete Dataset
        Task<TEntity> DeleteAsync(TEntity entity);
    }
}