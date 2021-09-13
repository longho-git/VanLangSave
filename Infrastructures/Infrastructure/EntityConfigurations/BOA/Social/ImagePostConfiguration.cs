using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.EntityConfigurations.BOA
{
    public class ImagePostConfiguration : EntityConfigurationBase<ImagePost, int>
    {
        public override void OnConfigure(EntityTypeBuilder<ImagePost> builder)
        {
            builder.HasOne(p => p.Post).WithMany().HasForeignKey(p => p.PostId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
