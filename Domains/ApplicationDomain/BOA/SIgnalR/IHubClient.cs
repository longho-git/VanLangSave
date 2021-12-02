using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models;

namespace ApplicationDomain.BOA.SIgnalR
{
    public interface IHubClient
    {
        Task BroadcastMessage(UserNotificationModel msg);
    }
}
