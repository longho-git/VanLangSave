using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;

namespace ApplicationDomain.BOA.Entities
{
    public class SupplierSuggest : EntityBase<int>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Status { get; set; }
        public decimal Price { get; set; }
        public int ProductNeedId { get; set; }
        public ProductNeed ProductNeed { get; set; }
        public int SupplierId { get; set; }
    }
}
