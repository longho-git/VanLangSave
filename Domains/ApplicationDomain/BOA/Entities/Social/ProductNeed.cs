using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;

namespace ApplicationDomain.BOA.Entities
{
    public class ProductNeed : EntityBase<int>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageURL { get; set; }
        public string Remark { get; set; }
        public int PostId { get; set; }
        public int CategroriesId { get; set; }
        public double expectedPrice { get; set; }
        public int expectedProduct { get; set; }
        public Post Post { get; set; }
    }
}
