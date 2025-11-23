using API.Application.Dto.ContactPage;
using Application.Features.ContactPage.Queries.GetContactPageList;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ContactController : BaseApiController
{
    private readonly IMediator mediator;

    public ContactController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet("GetContactsPage")]
    public async Task<ActionResult<List<ContactPageDto>>> GetContactsPage()
    {
        var result = await mediator.Send(new GetContactPageListQuery());
        return Ok(result);
    }
}