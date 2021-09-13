using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.EntityConfigurations.BOA
{
    public class ProductNeedConfiguration : EntityConfigurationBase<ProductNeed, int>
    {
        public override void OnConfigure(EntityTypeBuilder<ProductNeed> builder)
        {
            builder.HasOne(p => p.Post).WithMany().HasForeignKey(p => p.PostId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
