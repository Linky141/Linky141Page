using API.Application.Dto.DownloadsPage;
using Application.Features.DownloadsPage.Queries.GetDownloadsPageList;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DownloadsController : BaseApiController
{
     private readonly IMediator mediator;

    public DownloadsController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet("GetDownloadsPage")]
    public async Task<ActionResult<List<DownloadsPageDto>>> GetDownloadsPage()
    {
        var result = await mediator.Send(new GetDownloadsPageListQuery());
        return Ok(result);
    }
}