using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;

namespace ApplicationDomain.BOA.Entities
{
    public class Supplier : EntityBase<int>
    {
        public string Name { get; set; }
        public string address { get; set; }
        public string ImageURL { get; set; }
        public int typeSupplier { get; set; }
        public double evaluate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
