using API.controllers;
using API.data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProjectsController : BaseApiController
{
    private readonly PageContext pageContext;

    public ProjectsController(PageContext pageContext)
    {
        this.pageContext = pageContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<Projects>>> GetProjects()
    {
        var projectsData = await pageContext.Projects.ToListAsync();
        return Ok(projectsData);
    }
}