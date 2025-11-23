using API.Application.Dto.HomePage;
using MediatR;

namespace Application.Features.HomePage.Commands.UpdateHomePage;

public record UpdateHomePageCommand(HomePageDto dto) : IRequest<HomePageDto>;


