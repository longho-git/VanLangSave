using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.Entities.Notifi;
using ApplicationDomain.BOA.Entities.Notification;
using ApplicationDomain.Identity.Entities;
using AutoMapper;

namespace ApplicationDomain.BOA.Models
{
    public class NotificationClientModel
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string MainURL { get; set; }
        public int EntityId { get; set; }
        public int ActorId { get; set; }
        public UserProfile Actor { get; set; }
    }

    public class NotificationClientModelMapper : Profile
    {
        public NotificationClientModelMapper()
        {
            CreateMap<NotificationClient, NotificationClientModel>();
        }
    }
}
