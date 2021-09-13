using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.EntityConfigurations.BOA
{
    public class SupplierConfiguration : EntityConfigurationBase<Supplier, int>
    {
        public override void OnConfigure(EntityTypeBuilder<Supplier> builder)
        {
            builder.HasOne(p => p.User).WithMany().HasForeignKey(p => p.UserId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
