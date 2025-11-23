using MediatR;

namespace Application.Features.DownloadsPage.Queries.GetDownloadsPageList;

public record GetDownloadsPageListQuery : IRequest<List<API.Domain.Entities.DownloadsPage>>;


