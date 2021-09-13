using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.EntityConfigurations.BOA
{
    public class UserProfileConfiguration : EntityConfigurationBase<UserProfile, int>
    {
        public override void OnConfigure(EntityTypeBuilder<UserProfile> builder)
        {
            builder.HasOne(p => p.User).WithMany().HasForeignKey(p => p.UserId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
