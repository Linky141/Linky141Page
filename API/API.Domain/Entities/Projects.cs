namespace API.Domain.Entities;

public class Projects
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public long LastUpdate { get; set; }
    public required string Github { get; set; }
    public required string Description { get; set; }
    public required string[] Photos { get; set; }
    public required List<Comment> Comments { get; set; } = new();
}