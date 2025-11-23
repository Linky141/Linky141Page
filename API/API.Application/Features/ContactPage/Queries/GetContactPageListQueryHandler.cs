using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.ContactPage.Queries.GetContactPageList;
public class GetContactPageListQueryHandler : IRequestHandler<GetContactPageListQuery, List<API.Domain.Entities.ContactPage>>
{
    private readonly IPageContext _context;

    public GetContactPageListQueryHandler(IPageContext context)
    {
        _context = context;
    }

    public async Task<List<API.Domain.Entities.ContactPage>> Handle(GetContactPageListQuery request, CancellationToken cancellationToken)
    {
        return await _context.Contacts.ToListAsync(cancellationToken);
    }
}