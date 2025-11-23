using MediatR;

namespace Application.Features.HomePage.Queries.GetHomePageList;

public record GetHomePageListQuery : IRequest<List<API.Domain.Entities.HomePage>>;


