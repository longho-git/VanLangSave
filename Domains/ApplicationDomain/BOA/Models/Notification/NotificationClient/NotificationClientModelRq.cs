using ApplicationDomain.BOA.Entities.Notifi;
using ApplicationDomain.BOA.Entities.Notification;
using AutoMapper;
using FluentValidation;

namespace ApplicationDomain.BOA.Models
{
    public class NotificationClientModelRq
    {
        public string Message { get; set; }
        public string MainURL { get; set; }
        public int EntityId { get; set; }
         public int RecipientId { get; set; }
        public int ActorId { get; set; }
    }

    public class NotificationClientModelRqMapper : Profile
    {
        public NotificationClientModelRqMapper()
        {
            CreateMap<NotificationClientModelRq, NotificationClient>();
        }
    }

    public class NotificationClientModelRqValidator : AbstractValidator<NotificationClientModelRq>
    {
        public NotificationClientModelRqValidator()
        {
            RuleFor(p => p.MainURL).NotEmpty();
        
        }
    }
}
