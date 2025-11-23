using API.Domain.Entities;

public interface IHomePageRepository
{
    Task<HomePage?> GetByIdAsync(int id);
    Task<int> SaveAsync();
}