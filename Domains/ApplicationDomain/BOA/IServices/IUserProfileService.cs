using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IServices
{
    public interface IUserProfileService
    {
        Task<IEnumerable<UserProfileModel>> GetUserProfilesAsync();
        Task<UserProfileModel> GetUserProfileByIdAsync(int id);
        Task<UserProfileModel> GetDistricByUserIdAsync(int id);
        Task<int> CreateUserProfileAsync(UserProfileModelRq model, UserIdentity<int> issuer);
        Task<int> UpdateUserProfileAsync(int id, UserProfileModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteUserProfileAsync(int id);
        Task<bool> CheckCodeExistsAsync(string code);
        Task<string> AutoGenerateCodeAsync(string code = "");
        Task<int> UpdateUserProfileAvatarAsync(int id, string avatarURL, UserIdentity<int> issuer);
    }
}
