using Microsoft.AspNetCore.Mvc;
using API.Domain.Entities;

namespace API.RequestHelpers;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<DTO.HomePageDto, HomePage>();
        CreateMap<HomePage, DTO.HomePageDto>();
    }
}