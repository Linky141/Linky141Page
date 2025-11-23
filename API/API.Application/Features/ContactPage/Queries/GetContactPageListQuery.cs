using MediatR;

namespace Application.Features.ContactPage.Queries.GetContactPageList;

public record GetContactPageListQuery : IRequest<List<API.Domain.Entities.ContactPage>>;


