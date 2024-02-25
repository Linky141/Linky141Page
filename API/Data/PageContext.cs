using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class PageContext : DbContext
{
    public PageContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<HomePage> HomePages { get; set; }
}