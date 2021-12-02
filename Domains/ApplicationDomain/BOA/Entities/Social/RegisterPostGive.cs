using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;
using System.Collections.Generic;

namespace ApplicationDomain.BOA.Entities
{
    public class RegisterPostGive : EntityBase<int>
    {
        public int StatusId { get; set; }
        public string Remark { get; set; }
        public int UserRegisterId { get; set; }
        public UserProfile UserRegister { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
