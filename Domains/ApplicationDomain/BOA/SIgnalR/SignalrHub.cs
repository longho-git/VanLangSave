using System.Threading.Tasks;
using ApplicationDomain.BOA.Models;
using Microsoft.AspNetCore.SignalR;

namespace ApplicationDomain.BOA.SIgnalR
{
    public class SignalrHub : Hub<IHubClient>
    {
        public async Task BroadcastMessage(UserNotificationModel msg)
        {
            await Clients.All.BroadcastMessage(msg);
        }

    }
}