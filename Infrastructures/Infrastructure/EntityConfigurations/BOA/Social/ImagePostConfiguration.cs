using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations.BOA.Social
{
    public class ImagePostConfiguration : EntityConfigurationBase<ImagePost, int>
    {
        public override void OnConfigure(EntityTypeBuilder<ImagePost> builder)
        {
            builder.HasOne(p => p.Post).WithMany().HasForeignKey(p => p.PostId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
