using MediatR;
using AutoMapper;
using API.Application.Dto.HomePage;

namespace Application.Features.HomePage.Commands.UpdateHomePage;
public class UpdateHomePageCommandHandler : IRequestHandler<UpdateHomePageCommand, HomePageDto>
{
     private readonly IHomePageRepository _repo;
    private readonly IMapper _mapper;

    public UpdateHomePageCommandHandler(IHomePageRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<HomePageDto> Handle(UpdateHomePageCommand request, CancellationToken cancellationToken)
    {
         var homePage = await _repo.GetByIdAsync(request.dto.Id);

        if (homePage == null)
            throw new KeyNotFoundException($"Home page with id {request.dto.Id} not found.");

        _mapper.Map(request.dto, homePage);

        var result = await _repo.SaveAsync();

        if (result <= 0)
            throw new Exception("Problem updating home page");

        return _mapper.Map<HomePageDto>(homePage);
    }
}