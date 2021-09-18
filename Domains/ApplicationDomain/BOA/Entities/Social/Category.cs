using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;

namespace ApplicationDomain.BOA.Entities
{
    public class Category : EntityBase<int>
    {
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public int Col { get; set; }
    }
}
