using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.EntityConfigurations.BOA
{
    public class SupplierSuggestConfiguration : EntityConfigurationBase<SupplierSuggest, int>
    {
        public override void OnConfigure(EntityTypeBuilder<SupplierSuggest> builder)
        {
            builder.HasOne(p => p.ProductNeed).WithMany().HasForeignKey(p => p.ProductNeedId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
            builder.HasOne(p => p.Supplier).WithMany().HasForeignKey(p => p.SupplierId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
