using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;
using System;

namespace ApplicationDomain.BOA.Entities
{
    public class UserProfile : EntityBase<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarURL { set; get; }
        public string Code { get; set; }
        public string StudentId { get; set; }
        public DateTime BirthDay { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
