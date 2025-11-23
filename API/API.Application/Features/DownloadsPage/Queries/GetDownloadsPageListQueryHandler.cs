using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.DownloadsPage.Queries.GetDownloadsPageList;
public class GetDownloadsPageListQueryHandler : IRequestHandler<GetDownloadsPageListQuery, List<API.Domain.Entities.DownloadsPage>>
{
    private readonly IPageContext _context;

    public GetDownloadsPageListQueryHandler(IPageContext context)
    {
        _context = context;
    }

    public async Task<List<API.Domain.Entities.DownloadsPage>> Handle(GetDownloadsPageListQuery request, CancellationToken cancellationToken)
    {
        return await _context.Downloads.ToListAsync(cancellationToken);
    }
}