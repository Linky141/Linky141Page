using API.data;
using API.entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.controllers;
public class HomePageController : BaseApiController
{
    private readonly PageContext pageContext;

    public HomePageController(PageContext pageContext)
    {
        this.pageContext = pageContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<HomePage>>> GetHomePage()
    {
        var homePageData = await pageContext.HomePages.ToListAsync();
        return Ok(homePageData);
    }
}
