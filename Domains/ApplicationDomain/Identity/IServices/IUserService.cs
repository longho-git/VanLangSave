
using ApplicationDomain.Identity.Entities;
using ApplicationDomain.Identity.Models;
using AspNetCore.Common.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationDomain.Identity.IServices
{
    public interface IUserService
    {
        Task<User> ActiveUserAsync(int id, bool active);
        Task<User> ChangePass(int id, string uniqueId);
        Task<User> FindByNameAsync(string userName);
        IEnumerable<UserModel> GetListUsers();
        Task<User> CreateUserAsync(CreatedUserRq model, UserIdentity<int> issuer = null);
        Task<User> UpdateUserAsync(int id,  string uniqueId);
        Task<bool> DeleteUserAsync(int id);
        Task<UserModel> GetUserById(int id);
        Task<bool> AddRoleToUserAsync(UpdateUserRoleModelRq model);
        Task<bool> RemoveRoleToUserAsync(UpdateUserRoleModelRq model);
        Task<IList<string>> GetRoleByUser(int userId);
        Task<bool> AddRolesToUser(AddRolesToUserModelRq model);
        IEnumerable<UserModel> GetManagerUsersAsync();
        IEnumerable<UserModel> GetUsersNormalsAsync(); 
        Task<bool> CheckEmailAsync(string email);
        Task<int> CreateUserManagerAsync(CreatedUserRq model, UserIdentity<int> issuer = null);
    }
}
