using API.Application.Dto.ProjectsPageDto;
using API.Domain.Entities;
using API.Infrastructure.Data;
using Application.Features.ProjectsPage.Queries.GetProjectsPageList;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProjectsController : BaseApiController
{
    private readonly IMediator mediator;

    public ProjectsController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet("GetProjectsPage")]
    public async Task<ActionResult<List<ProjectsPageDto>>> GetProjectsPage()
    {
        var result = await mediator.Send(new GetProjectsPageListQuery());
        return Ok(result);
    }
}