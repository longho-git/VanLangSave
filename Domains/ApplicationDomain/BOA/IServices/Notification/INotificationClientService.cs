using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models;
using AspNetCore.Common.Identity;

namespace ApplicationDomain.BOA.IServices.Notification
{
    public interface INotificationClientService
    {
        Task<int> CreateNotificationAsync(NotificationClientModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteNotificationClientAsync(int id);
        Task<IEnumerable<NotificationClientModel>> GetNotificationClientsAsync();
        Task<NotificationClientModel> GetNotificationClientByIdAsync(int id);
        Task<bool> UpdateNotificationClientAsync(int id, NotificationClientModelRq model, UserIdentity<int> issuer);
    }
}