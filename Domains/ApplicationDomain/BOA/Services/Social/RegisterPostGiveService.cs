using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.IServices.Notification;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.RegisterPostGives;
using ApplicationDomain.BOA.Models.UserProfiles;
using ApplicationDomain.Helper;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDomain.BOA.Services.Social
{
    public class RegisterPostGiveService : ServiceBase, IRegisterPostGiveService
    {
        private readonly IRegisterPostGiveRepository _registerPostGiveRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly INotificationClientService _notificationClientService;
        private readonly IPostRepository _postRepository;

        public RegisterPostGiveService(
            IRegisterPostGiveRepository registerPostGiveRepository,
            IUserProfileRepository userProfileRepository,
            INotificationClientService notificationClientService,
            IPostRepository postRepository,
            IMapper mapper,
            IUnitOfWork uow
        ) : base(mapper, uow)
        {
            _registerPostGiveRepository = registerPostGiveRepository;
            _notificationClientService = notificationClientService;
            _userProfileRepository = userProfileRepository;
            _postRepository = postRepository;
        }

        public async Task<IEnumerable<RegisterPostGiveModel>> GetRegisterPostGivesAsync()
        {
            return await _registerPostGiveRepository.GetRegisterPostGives().MapQueryTo<RegisterPostGiveModel>(_mapper).ToListAsync();
        }

        public async Task<RegisterPostGiveModel> GetRegisterPostGiveByIdAsync(int id)
        {
            return await _registerPostGiveRepository.GetRegisterPostGiveById(id).MapQueryTo<RegisterPostGiveModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateRegisterPostGiveAsync(RegisterPostGiveModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var userRegister = await _userProfileRepository.GetDistricByUserId(issuer.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var registerPostGive = _mapper.Map<RegisterPostGive>(model);
                registerPostGive.StatusId = RegisterPost.Checked;
                registerPostGive.UserRegisterId = userRegister[0].Id;
                registerPostGive.CreateBy(issuer).UpdateBy(issuer);
                var post = await _postRepository.GetEntityByIdAsync(model.PostId);
                var recipient = await _userProfileRepository.GetDistricByUserId(post.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                _registerPostGiveRepository.Create(registerPostGive);
                if (await _uow.SaveChangesAsync() != 1) return 0;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = userRegister[0].Id,
                    EntityId = registerPostGive.Id,
                    MainURL = "userpost",
                    Message = MessageRaw.RegisterPost + " " + post.Title,
                    RecipientId = recipient[0].Id,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return registerPostGive.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<IEnumerable<RegisterPostGiveModel>> GetRegisterPostGiveByPostIdAsync(int id)
        {
            return await _registerPostGiveRepository.GetRegisterPostGiveByPostId(id).MapQueryTo<RegisterPostGiveModel>(_mapper).ToListAsync();
        }
       public async Task<IEnumerable<RegisterPostGiveModel>> GetRegisterPostGiveByUserProfileIdAsync(int id)
       {
           return await _registerPostGiveRepository.GetRegisterPostGiveByUserProfileId(id).MapQueryTo<RegisterPostGiveModel>(_mapper).ToListAsync();
       }
        public async Task<bool> UpdateRegisterPostGiveAsync(int id, RegisterPostGiveModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var registerPostGive = await _registerPostGiveRepository.GetEntityByIdAsync(id);
                if (registerPostGive == null)
                {
                    return false;
                }
                _mapper.Map(model, registerPostGive);
                registerPostGive.UpdateBy(issuer);
                _registerPostGiveRepository.Update(registerPostGive);
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

        public async Task<bool> AcceptRegisterPostGiveAsync(int id, UserIdentity<int> issuer)
        {
            try
            {
                var registerPostGive = await _registerPostGiveRepository.GetEntityByIdAsync(id);
                if (registerPostGive == null)
                {
                    return false;
                }
                registerPostGive.StatusId = RegisterPost.Approve;
                registerPostGive.UpdateBy(issuer);
                _registerPostGiveRepository.Update(registerPostGive);
                var post = await _postRepository.GetEntityByIdAsync(registerPostGive.PostId);
                var quantity = post.Quantity -1;
                post.Quantity = quantity;
                post.Statuts = quantity <= 0 ? PostStatus.Done : PostStatus.Deal;
                _postRepository.Update(post);
                if (post.UserProfileId == null) return false;
                if (await _uow.SaveChangesAsync() <= 0) return false;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = post.UserProfileId.Value,
                    EntityId = registerPostGive.Id,
                    MainURL = "registerList",
                    Message = MessageRaw.RegisterAccept,
                    RecipientId = registerPostGive.UserRegisterId,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> RejectRegisterPostGiveAsync(int id, UserIdentity<int> issuer)
        {
            try
            {
                var registerPostGive = await _registerPostGiveRepository.GetEntityByIdAsync(id);
                if (registerPostGive == null)
                {
                    return false;
                }
                registerPostGive.StatusId = RegisterPost.Rejected;
                registerPostGive.UpdateBy(issuer);
                _registerPostGiveRepository.Update(registerPostGive);
                var post = await _postRepository.GetEntityByIdAsync(registerPostGive.PostId);
                if (post.UserProfileId == null) return false;
                if (await _uow.SaveChangesAsync() <= 0) return false;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = post.UserProfileId.Value,
                    EntityId = registerPostGive.Id,
                    MainURL = "registerList",
                    Message = MessageRaw.RegisterReject,
                    RecipientId = registerPostGive.UserRegisterId,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> DeleteRegisterPostGiveAsync(int id)
        {
            try
            {
                var registerPostGive = await _registerPostGiveRepository.GetEntityByIdAsync(id);
                _registerPostGiveRepository.Delete(registerPostGive);
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
    }
}
