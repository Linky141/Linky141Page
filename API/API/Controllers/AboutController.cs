using API.controllers;
using API.data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AboutController : BaseApiController
{
    private readonly PageContext pageContext;

    public AboutController(PageContext pageContext)
    {
        this.pageContext = pageContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<About>>> GetAbout()
    {
        var aboutData = await pageContext.Abouts.ToListAsync();
        return Ok(aboutData);
    }
}