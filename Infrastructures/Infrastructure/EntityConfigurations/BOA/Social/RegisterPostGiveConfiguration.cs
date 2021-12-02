using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations.BOA.Social
{
    public class RegisterPostGiveConfiguration : EntityConfigurationBase<RegisterPostGive, int>
    {
        public override void OnConfigure(EntityTypeBuilder<RegisterPostGive> builder)
        {
            builder.HasOne(p => p.UserRegister).WithMany().HasForeignKey(p => p.UserRegisterId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
            builder.HasOne(p => p.Post).WithMany().HasForeignKey(p => p.PostId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
        }
    }
}
