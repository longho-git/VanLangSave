using ApplicationDomain.BOA.Entities.Social;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations.BOA.Social
{
    public class RegisterPostExchangeConfiguration : EntityConfigurationBase<RegisterPostExchange, int>
    {
        public override void OnConfigure(EntityTypeBuilder<RegisterPostExchange> builder)
        {
            builder.HasOne(p => p.UserRegister).WithMany().HasForeignKey(p => p.UserRegisterId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
            builder.HasOne(p => p.Post).WithMany().HasForeignKey(p => p.PostId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
            builder.HasOne(p => p.PostExchange).WithMany().HasForeignKey(p => p.PostExchangeId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
        }
    }
}
