namespace API.Application.Dto;

public class CommentDto
{
    public int Id { get; set; }
    public required string User { get; set; }
    public required string Content { get; set; }
    public long Date { get; set; }
}