namespace API.Domain.Entities;

public class Downloads
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string DownloadLink { get; set; }
    public long UploadDate { get; set; }
}