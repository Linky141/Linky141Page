namespace API.Application.Dto.ContactPage;

public class ContactPageDto
{
    public int Id { get; set; }
    public required string ContactName { get; set; }
    public required string ContactValue { get; set; }

}