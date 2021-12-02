using ApplicationDomain.BOA.Entities.Notifi;
using AutoMapper;
using FluentValidation;

namespace ApplicationDomain.BOA.Models
{
    public class UserNotificationModelRq
    {
        public bool IsRead { get; set; }
        public int NotificationId { get; set; }
        public int RecipientId { get; set; }
    }

    public class UserNotificationModelRqMapper : Profile
    {
        public UserNotificationModelRqMapper()
        {
            CreateMap<UserNotificationModelRq, UserNotification>();
        }
    }

    public class UserNotificationModelRqValidator : AbstractValidator<UserNotificationModelRq>
    {
        public UserNotificationModelRqValidator()
        {
            RuleFor(p => p.NotificationId).NotEmpty();
            RuleFor(p => p.RecipientId).NotEmpty();
        }
    }
}
