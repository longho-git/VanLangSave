using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;


namespace ApplicationDomain.BOA.Entities.Notification
{
    public class NotificationClient : EntityBase<int>
    {
        public string Message { get; set; }
        public string MainURL { get; set; }
        public int EntityId { get; set; }
        public int ActorId { get; set; }
        public UserProfile Actor { get; set; }
    }
}
