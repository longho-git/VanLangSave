using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations.BOA.Social
{
    public class ProductNeedConfiguration : EntityConfigurationBase<ProductNeed, int>
    {
        public override void OnConfigure(EntityTypeBuilder<ProductNeed> builder)
        {
            builder.HasOne(p => p.Post).WithMany().HasForeignKey(p => p.PostId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
