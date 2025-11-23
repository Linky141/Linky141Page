using Microsoft.EntityFrameworkCore;
using API.Domain.Entities;

public interface IPageContext
{
    DbSet<HomePage> HomePages { get; set;}
    DbSet<AboutPage> Abouts { get; set; }
    DbSet<ContactPage> Contacts { get; set; }
    DbSet<DownloadsPage> Downloads { get; set; }
    DbSet<ProjectsPage> Projects { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}