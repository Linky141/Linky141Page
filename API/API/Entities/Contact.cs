namespace API.Entities;

public class Contact
{
    public int Id { get; set; }
    public required string ContactName { get; set; }
    public required string ContactValue { get; set; }

}