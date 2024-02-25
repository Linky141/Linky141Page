namespace API.Entities;

public class Projects
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Content { get; set; }
    public List<string> Photos { get; set; } =new();
    public List<Comment> Comments { get; set; } = new();
}