using API.Application.Dto.AboutPage;
using Application.Features.AboutPage.Queries.GetAboutPageList;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AboutPageController : BaseApiController
{
    private readonly IMediator mediator;

    public AboutPageController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet("GetAboutPageList")]
    public async Task<ActionResult<List<AboutPageDto>>> GetAboutPageList()
    {
        var result = await mediator.Send(new GetAboutPageListQuery());
        return Ok(result);
    }
}