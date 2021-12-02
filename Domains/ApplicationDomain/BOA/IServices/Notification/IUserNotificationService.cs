using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models;
using AspNetCore.Common.Identity;

namespace ApplicationDomain.BOA.IServices.Notification
{
    public interface IUserNotificationService
    {
        Task<int> CreateUserNotificationAsync(UserNotificationModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteUserNotificationAsync(int id);
        Task<IEnumerable<UserNotificationModel>> GetUserNotificationsAsync();
        Task<UserNotificationModel> GetUserNotificationByIdAsync(int id);
        Task<bool> UpdateUserNotificationAsync(int id, UserNotificationModelRq model, UserIdentity<int> issuer);
        Task<IEnumerable<UserNotificationModel>> GetUserNotificationByUserProfileIdAsync(int id);
    }
}