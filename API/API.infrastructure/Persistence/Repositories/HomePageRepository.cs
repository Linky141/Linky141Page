using API.Domain.Entities;
using API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class HomePageRepository : IHomePageRepository
{
    private readonly PageContext _context;

    public HomePageRepository(PageContext context)
    {
        _context = context;
    }

    public async Task<HomePage?> GetByIdAsync(int id)
    {
        return await _context.HomePages.SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<int> SaveAsync()
    {
        return await _context.SaveChangesAsync();
    }
}