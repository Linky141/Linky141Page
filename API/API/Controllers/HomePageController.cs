using API.data;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.controllers;
public class HomePageController : BaseApiController
{
    private readonly PageContext pageContext;
    private readonly IMapper mapper;

    public HomePageController(PageContext pageContext, IMapper mapper)
    {
        this.pageContext = pageContext;
        this.mapper = mapper;
    }

    [HttpGet("GetHomePage")]
    public async Task<ActionResult<List<HomePage>>> GetHomePage()
    {
        var homePageData = await pageContext.HomePages.ToListAsync();
        return Ok(homePageData);
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
