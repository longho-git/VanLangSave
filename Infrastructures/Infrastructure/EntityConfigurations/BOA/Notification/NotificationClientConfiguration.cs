using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ApplicationDomain.BOA.Entities.Notifi;
using ApplicationDomain.BOA.Entities.Notification;

namespace Infrastructure.EntityConfigurations.BOA.Notification
{
    public class NotificationClientConfiguration : EntityConfigurationBase<NotificationClient, int>
    {
        public override void OnConfigure(EntityTypeBuilder<NotificationClient> builder)
        {
            builder.HasOne(p => p.Actor).WithMany().HasForeignKey(p => p.ActorId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
        }
    }
}
