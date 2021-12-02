using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.AutoGenerate;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.Services
{
    public class UserProfileService : ServiceBase, IUserProfileService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileService(
            IUserProfileRepository userProfileRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _userProfileRepository = userProfileRepository;
        }

        public async Task<IEnumerable<UserProfileModel>> GetUserProfilesAsync()
        {
            return await _userProfileRepository.GetUserProfiles().MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
        }

        public async Task<UserProfileModel> GetUserProfileByIdAsync(int id)
        {
            return await _userProfileRepository.GetUserProfileById(id).MapQueryTo<UserProfileModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateUserProfileAsync(UserProfileModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var UserProfile = _mapper.Map<UserProfile>(model);
                UserProfile.CreateBy(issuer).UpdateBy(issuer);
                _userProfileRepository.Create(UserProfile);
                return await _uow.SaveChangesAsync() == 1 ? UserProfile.Id : 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<UserProfileModel> GetDistricByUserIdAsync(int id)
        {
            var result = await _userProfileRepository.GetDistricByUserId(id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
            return result?[0];
        }

        public async Task<int> UpdateUserProfileAsync(int id, UserProfileModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var userProfile = await _userProfileRepository.GetEntityByIdAsync(id);
                if (userProfile == null)
                {
                    return 0;
                }
                _mapper.Map( model, userProfile);
                userProfile.UpdateBy(issuer);
                _userProfileRepository.Update(userProfile);
                return await _uow.SaveChangesAsync() == 1 ? id : 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<int> UpdateUserProfileAvatarAsync(int id, string avatarURL, UserIdentity<int> issuer)
        {
            try
            {
                var userProfile = await _userProfileRepository.GetEntityByIdAsync(id);
                if (userProfile == null)
                {
                    return 0;
                }
                userProfile.AvatarURL = avatarURL;
                userProfile.UpdateBy(issuer);
                _userProfileRepository.Update(userProfile);
                return await _uow.SaveChangesAsync() == 1 ? id : 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> DeleteUserProfileAsync(int id)
        {
            try
            {
                var UserProfile = await _userProfileRepository.GetEntityByIdAsync(id);
                _userProfileRepository.Delete(UserProfile);
                return await _uow.SaveChangesAsync() == 1;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    

       

        public async Task<bool> CheckCodeExistsAsync(string code)
        {
            return await _userProfileRepository.CheckCodeExistsAsync(code);
        }

        public async Task<string> AutoGenerateCodeAsync(string code = "")
        {
            if (code.Equals(""))
                code = AutoGenerate.AutoGenerateCode(3);
            if (!await CheckCodeExistsAsync(code))
                return code;
            return await AutoGenerateCodeAsync(AutoGenerate.AutoGenerateCode(3));
        }
    }
}
