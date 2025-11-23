using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.AboutPage.Queries.GetAboutPageList;
public class GetAboutPageListQueryHandler : IRequestHandler<GetAboutPageListQuery, List<API.Domain.Entities.AboutPage>>
{
    private readonly IPageContext _context;

    public GetAboutPageListQueryHandler(IPageContext context)
    {
        _context = context;
    }

    public async Task<List<API.Domain.Entities.AboutPage>> Handle(GetAboutPageListQuery request, CancellationToken cancellationToken)
    {
        return await _context.Abouts.ToListAsync(cancellationToken);
    }
}