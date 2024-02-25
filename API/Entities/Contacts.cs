namespace API.Entities;

public class Contacts
{
    public int Id { get; set; }
    public List<ContactEntry> Contact { get; set; } = new();  
}