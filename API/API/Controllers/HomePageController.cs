using API.Application.Dto.HomePage;
using Application.Features.HomePage.Commands.UpdateHomePage;
using Application.Features.HomePage.Queries.GetHomePageList;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class HomePageController : BaseApiController
{
    private readonly IMediator mediator;

    public HomePageController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet("GetHomePageList")]
    public async Task<ActionResult<List<HomePageDto>>> GetHomePageList()
    {
        var result = await mediator.Send(new GetHomePageListQuery());
        return Ok(result);
    }

    [HttpPut("UpdateHomePage")]
    public async Task<ActionResult<HomePageDto>> UpdateHomePage(HomePageDto homePageDto)
    {
        try
        {
            var updatedHomePage = await mediator.Send(new UpdateHomePageCommand(homePageDto));
            return Ok(updatedHomePage);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { ex.Message });
        }
    }
}
