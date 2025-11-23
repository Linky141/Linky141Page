using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ProjectsPage.Queries.GetProjectsPageList;
public class GetProjectsPageListQueryHandler : IRequestHandler<GetProjectsPageListQuery, List<API.Domain.Entities.ProjectsPage>>
{
    private readonly IPageContext _context;

    public GetProjectsPageListQueryHandler(IPageContext context)
    {
        _context = context;
    }

    public async Task<List<API.Domain.Entities.ProjectsPage>> Handle(GetProjectsPageListQuery request, CancellationToken cancellationToken)
    {
        return await _context.Projects.ToListAsync(cancellationToken);
    }
}