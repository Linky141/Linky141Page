using MediatR;

namespace Application.Features.AboutPage.Queries.GetAboutPageList;

public record GetAboutPageListQuery : IRequest<List<API.Domain.Entities.AboutPage>>;


