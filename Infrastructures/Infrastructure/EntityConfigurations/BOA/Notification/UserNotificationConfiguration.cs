using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ApplicationDomain.BOA.Entities.Notifi;
using ApplicationDomain.BOA.Entities.Notification;

namespace Infrastructure.EntityConfigurations.BOA.Notification
{
    public class UserNotificationConfiguration : EntityConfigurationBase<UserNotification, int>
    {
        public override void OnConfigure(EntityTypeBuilder<UserNotification> builder)
        {
            builder.HasOne(p => p.Recipient).WithMany().HasForeignKey(p => p.RecipientId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Cascade);
            builder.HasOne(p => p.Notification).WithMany().HasForeignKey(p => p.NotificationId).OnDelete(Microsoft.EntityFrameworkCore.DeleteBehavior.Restrict);
        }
    }
}
