using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.data;

public class PageContext : DbContext
{
    public PageContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<HomePage> HomePages { get; set; }
    public DbSet<About> Abouts { get; set; }
}