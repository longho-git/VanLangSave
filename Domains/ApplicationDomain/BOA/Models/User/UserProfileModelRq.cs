using ApplicationDomain.BOA.Entities;
using AutoMapper;

namespace ApplicationDomain.BOA.Models.UserProfiles
{
    public class UserProfileModelRq
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public int Sex { get; set; }
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
