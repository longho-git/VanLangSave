using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.EntityConfigurations.BOA
{
    public class PostConfiguration : EntityConfigurationBase<Post, int>
    {
        public override void OnConfigure(EntityTypeBuilder<Post> builder)
        {
            builder.HasOne(p => p.User).WithMany().HasForeignKey(p => p.UserId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
