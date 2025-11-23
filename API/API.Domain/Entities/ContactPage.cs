namespace API.Domain.Entities;

public class ContactPage
{
    public int Id { get; set; }
    public required string ContactName { get; set; }
    public required string ContactValue { get; set; }

}