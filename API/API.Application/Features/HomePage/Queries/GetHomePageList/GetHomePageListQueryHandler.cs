using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.HomePage.Queries.GetHomePageList;
public class GetHomePageListQueryHandler : IRequestHandler<GetHomePageListQuery, List<API.Domain.Entities.HomePage>>
{
    private readonly IPageContext _context;

    public GetHomePageListQueryHandler(IPageContext context)
    {
        _context = context;
    }

    public async Task<List<API.Domain.Entities.HomePage>> Handle(GetHomePageListQuery request, CancellationToken cancellationToken)
    {
        return await _context.HomePages.ToListAsync(cancellationToken);
    }
}