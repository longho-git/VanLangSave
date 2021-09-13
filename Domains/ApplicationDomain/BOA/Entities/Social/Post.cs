using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;
using System.Collections.Generic;

namespace ApplicationDomain.BOA.Entities
{
    public class Post : EntityBase<int>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int Type { get; set; }
        public int Statuts { get; set; }
        public bool Active { get; set; }
    }
}
