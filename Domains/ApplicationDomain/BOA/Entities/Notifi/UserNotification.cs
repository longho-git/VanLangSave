using ApplicationDomain.BOA.Entities.Notification;
using ApplicationDomain.Core.Entities;
using ApplicationDomain.Identity.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Entities.Notifi
{
    public class UserNotification : EntityBase<int>
    {
        public bool IsRead { get; set; }
        public int NotificationId { get; set; }
        public NotificationClient Notification { get; set; }
        public int RecipientId { get; set; }
        public UserProfile Recipient { get; set; }
    }
}
