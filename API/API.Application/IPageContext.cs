using Microsoft.EntityFrameworkCore;
using API.Domain.Entities;

public interface IPageContext
{
    DbSet<HomePage> HomePages { get; set;}
    DbSet<About> Abouts { get; set; }
    DbSet<Contact> Contacts { get; set; }
    DbSet<Downloads> Downloads { get; set; }
    DbSet<Projects> Projects { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}