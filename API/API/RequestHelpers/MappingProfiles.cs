namespace API.RequestHelpers;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<DTO.HomePageDto, Entities.HomePage>();
        CreateMap<Entities.HomePage, DTO.HomePageDto>();
    }
}