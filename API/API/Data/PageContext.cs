using API.entities;
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
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Downloads> Downloads { get; set; }
    public DbSet<Projects> Projects { get; set; }
}