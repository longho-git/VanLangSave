using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;
using System.Collections.Generic;

namespace ApplicationDomain.BOA.Entities
{
    public class ImagePost : EntityBase<int>
    {
        public string ImageURL { get; set; }
        public bool MainPost { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }

    }
}
