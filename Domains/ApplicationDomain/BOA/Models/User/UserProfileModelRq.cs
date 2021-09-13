using ApplicationDomain.BOA.Entities;
using AutoMapper;

namespace ApplicationDomain.BOA.Models.UserProfiles
{
    public class UserProfileModelRq
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentId { get; set; }
    }

    public class UserProfileModelRqMapper : Profile
    {
        public UserProfileModelRqMapper()
        {
            CreateMap<UserProfileModelRq, UserProfile>();
            var mapers = CreateMap<UserProfile, UserProfileModelRq>();
      
        }
    }
}
