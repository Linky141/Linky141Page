using API.Domain.Entities;
using API.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class DownloadsController : BaseApiController
{
    private readonly PageContext pageContext;

    public DownloadsController(PageContext pageContext)
    {
        this.pageContext = pageContext;
    }

    [HttpGet("GetDownloads")]
    public async Task<ActionResult<List<Downloads>>> GetDownloads()
    {
        var downloadsData = await pageContext.Downloads.ToListAsync();
        return Ok(downloadsData);
    }
}