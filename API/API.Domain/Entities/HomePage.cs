namespace API.Domain.Entities;

public class HomePage
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
}