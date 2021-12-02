using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.Entities.Notifi;
using ApplicationDomain.BOA.Entities.Notification;
using ApplicationDomain.Identity.Entities;
using AutoMapper;

namespace ApplicationDomain.BOA.Models
{
    public class UserNotificationModel
    {
        public int Id { get; set; }
        public bool IsRead { get; set; }
        public int NotificationId { get; set; }
        public NotificationClient Notification { get; set; }
        public UserProfile NotificationActor { get; set; }
        public int RecipientId { get; set; }
        public UserProfile Recipient { get; set; }
    }

    public class UserNotificationModelMapper : Profile
    {
        public UserNotificationModelMapper()
        {
            CreateMap<UserNotification, UserNotificationModel>();
        }
    }
}
