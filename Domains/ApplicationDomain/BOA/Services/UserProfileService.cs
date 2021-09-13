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
        private readonly IUserProfileRepository _UserProfileRepository;
        private readonly IProvinceRepository _provinceRepository;
        public UserProfileService(
            IUserProfileRepository UserProfileRepository,
            IProvinceRepository provinceRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _UserProfileRepository = UserProfileRepository;
            _provinceRepository = provinceRepository;
        }

        public async Task<IEnumerable<UserProfileModel>> GetUserProfilesAsync()
        {
            return await _UserProfileRepository.GetUserProfiles().MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
        }

        public async Task<UserProfileModel> GetUserProfileByIdAsync(int id)
        {
            return await _UserProfileRepository.GetUserProfileById(id).MapQueryTo<UserProfileModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateUserProfileAsync(UserProfileModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var UserProfile = _mapper.Map<UserProfile>(model);
                UserProfile.CreateBy(issuer).UpdateBy(issuer);
                _UserProfileRepository.Create(UserProfile);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return UserProfile.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<UserProfileModel> GetDistricByUserIdAsync(int id)
        {
            var result = await _UserProfileRepository.GetDistricByUserId(id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
            if (result == null)
            {
                return null;
            }
            return result[0];
        }

        public async Task<int> UpdateUserProfileAsync(int id, UserProfileModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var UserProfile = await _UserProfileRepository.GetEntityByIdAsync(id);
                if (UserProfile == null)
                {
                    return 0;
                }
                _mapper.Map( model, UserProfile);
                UserProfile.UpdateBy(issuer);
                _UserProfileRepository.Update(UserProfile);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return id;
                }
                return 0;
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
                var UserProfile = await _UserProfileRepository.GetEntityByIdAsync(id);
                if (UserProfile == null)
                {
                    return 0;
                }
                UserProfile.AvatarURL = avatarURL;
                UserProfile.UpdateBy(issuer);
                _UserProfileRepository.Update(UserProfile);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return id;
                }
                return 0;
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
                var UserProfile = await _UserProfileRepository.GetEntityByIdAsync(id);
                _UserProfileRepository.Delete(UserProfile);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    

       

        public async Task<bool> CheckCodeExistsAsync(string code)
        {
            return await _UserProfileRepository.CheckCodeExistsAsync(code);
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
