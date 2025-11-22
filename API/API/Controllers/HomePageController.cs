using API.Domain.Entities;
using API.Infrastructure.Data;
using Application.Features.HomePage.Queries.GetHomePageList;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class HomePageController : BaseApiController
{
    private readonly PageContext pageContext; // to remover after implementing all handlers
    private readonly IMapper mapper;
    private readonly IMediator mediator;

    public HomePageController(PageContext pageContext, IMediator mediator, IMapper mapper)
    {
        this.pageContext = pageContext;
        this.mediator = mediator;
        this.mapper = mapper;
    }

    [HttpGet("GetHomePage")]
    public async Task<ActionResult<List<HomePage>>> GetHomePage()
    {
        var result = await mediator.Send(new GetHomePageListQuery());
        return Ok(result);
    }

    [HttpPut("UpdateHomePage")]
    public async Task<ActionResult<HomePage>> UpdateHomePage(DTO.HomePageDto homePageDto)
    {
        var homePage = RetrieveHomePage(homePageDto.Id).Result;

        if (homePage == null)
            return NotFound();

        mapper.Map(homePageDto, homePage);

        var result = await pageContext.SaveChangesAsync() > 0;

        if (result)
            return CreatedAtRoute("", mapper.Map<DTO.HomePageDto>(homePage));

        return BadRequest(new ProblemDetails { Title = "Problem updating home page" });
    }

    private async Task<HomePage> RetrieveHomePage(int id)
    {
        var homePage = await pageContext.HomePages.SingleOrDefaultAsync(homepage => homepage.Id == id);
        return homePage ?? new HomePage() { Id = id, Content = "", Title = "" };
    }
}
