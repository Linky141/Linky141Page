using MediatR;

namespace Application.Features.ProjectsPage.Queries.GetProjectsPageList;

public record GetProjectsPageListQuery : IRequest<List<API.Domain.Entities.ProjectsPage>>;


