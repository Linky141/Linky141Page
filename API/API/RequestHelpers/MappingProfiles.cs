using Microsoft.AspNetCore.Mvc;
using API.Domain.Entities;
using API.Application.Dto.HomePage;

namespace API.RequestHelpers;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<HomePageDto, HomePage>();
        CreateMap<HomePage, HomePageDto>();
    }
}