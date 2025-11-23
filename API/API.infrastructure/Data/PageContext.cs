using API.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Data;

public class PageContext : DbContext, IPageContext
{
    public PageContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<HomePage> HomePages { get; set; }
    public DbSet<AboutPage> Abouts { get; set; }
    public DbSet<ContactPage> Contacts { get; set; }
    public DbSet<DownloadsPage> Downloads { get; set; }
    public DbSet<ProjectsPage> Projects { get; set; }
}