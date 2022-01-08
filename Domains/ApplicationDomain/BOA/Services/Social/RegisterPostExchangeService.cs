using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Social;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices.Notification;
using ApplicationDomain.BOA.IServices.Social;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Social;
using ApplicationDomain.BOA.Models.Social.RegisterPostExchange;
using ApplicationDomain.BOA.Models.UserProfiles;
using ApplicationDomain.Helper;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDomain.BOA.Services.Social
{
    public class RegisterPostExchangeService : ServiceBase, IRegisterPostExchangeService
    {
        private readonly IRegisterPostExchangeRepository _registerPostExchangeRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly INotificationClientService _notificationClientService;
        private readonly IPostRepository _postRepository;
        public RegisterPostExchangeService(
            IRegisterPostExchangeRepository registerPostExchangeRepository,
            IUserProfileRepository userProfileRepository,
            INotificationClientService notificationClientService,
            IPostRepository postRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _registerPostExchangeRepository = registerPostExchangeRepository;
            _notificationClientService = notificationClientService;
            _userProfileRepository = userProfileRepository;
            _postRepository = postRepository;

        }

        public async Task<IEnumerable<RegisterPostExchangeModel>> GetRegisterPostExchangesAsync()
        {
            return await _registerPostExchangeRepository.GetRegisterPostExchanges().MapQueryTo<RegisterPostExchangeModel>(_mapper).ToListAsync();
        }

        public async Task<RegisterPostExchangeModel> GetRegisterPostExchangeByIdAsync(int id)
        {
            return await _registerPostExchangeRepository.GetRegisterPostExchangeById(id).MapQueryTo<RegisterPostExchangeModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateRegisterPostExchangeAsync(RegisterPostExchangeModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var userRegister = await _userProfileRepository.GetDistricByUserId(issuer.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var registerPostExchange = _mapper.Map<RegisterPostExchange>(model);
                registerPostExchange.StatusId = RegisterPostStatus.Waiting;
                registerPostExchange.PostOwnerStatusId = ExchangePostUserRegister.Waiting;
                registerPostExchange.UserRegisterId = userRegister[0].Id;
                registerPostExchange.CreateBy(issuer).UpdateBy(issuer);
                var post = await _postRepository.GetEntityByIdAsync(model.PostId);
                var recipient = await _userProfileRepository.GetDistricByUserId(post.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                _registerPostExchangeRepository.Create(registerPostExchange);
                if (await _uow.SaveChangesAsync() != 1) return 0;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = userRegister[0].Id,
                    EntityId = registerPostExchange.Id,
                    MainURL = "registerList",
                    Message = MessageRaw.RegisterExchangePost,
                    RecipientId = recipient[0].Id,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return registerPostExchange.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<IEnumerable<RegisterPostExchangeModel>> GetRegisterPostExchangeByPostIdAsync(int id)
        {
            try
            {
                return await _registerPostExchangeRepository.GetRegisterPostExchangeByPostId(id).MapQueryTo<RegisterPostExchangeModel>(_mapper).ToListAsync();

            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public async Task<IEnumerable<RegisterPostExchangeModel>> GetRegisterPostExchangeByUserProfileIdAsync(int id)
        {
            return await _registerPostExchangeRepository.GetRegisterPostExchangeByUserProfileId(id).MapQueryTo<RegisterPostExchangeModel>(_mapper).ToListAsync();
        }
        public async Task<int> GetRegisterPostExchangeDoneByUserProfileIdAsync(int id)
        {
            return await _registerPostExchangeRepository.GetRegisterPostExchangeDoneByUserProfileId(id).MapQueryTo<RegisterPostExchangeModel>(_mapper).CountAsync();
        }
        public async Task<bool> UpdateRegisterPostExchangeAsync(int id, RegisterPostExchangeModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var registerPostExchange = await _registerPostExchangeRepository.GetEntityByIdAsync(id);
                if (registerPostExchange == null)
                {
                    return false;
                }
                _mapper.Map(model, registerPostExchange);
                registerPostExchange.UpdateBy(issuer);
                _registerPostExchangeRepository.Update(registerPostExchange);
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

        public async Task<bool> DeleteRegisterPostExchangeAsync(int id)
        {
            try
            {
                var registerPostExchange = await _registerPostExchangeRepository.GetEntityByIdAsync(id);
                _registerPostExchangeRepository.Delete(registerPostExchange);
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
        public async Task<bool> AcceptRegisterPostExchangeByOwnerPostAsync(int id, int postExchange ,UserIdentity<int> issuer)
        {
            try
            {
                var registerPostExchange = await _registerPostExchangeRepository.GetEntityByIdAsync(id);
                if (registerPostExchange == null)
                {
                    return false;
                }
                registerPostExchange.PostOwnerStatusId = ExchangePostOwner.Approve;
                registerPostExchange.UserRegisterStatusId = ExchangePostUserRegister.Waiting;
                registerPostExchange.StatusId = RegisterPostStatus.WaitingUserRegister;
                registerPostExchange.PostExchangeId = postExchange;
                registerPostExchange.UpdateBy(issuer);
                _registerPostExchangeRepository.Update(registerPostExchange);
                var post = await _postRepository.GetEntityByIdAsync(registerPostExchange.PostId);
                var postExchangeEntity = await _postRepository.GetEntityByIdAsync(postExchange);
                post.Statuts = PostStatus.Deal;
                _postRepository.Update(post);
                if (post.UserProfileId == null) return false;
                if (await _uow.SaveChangesAsync() <= 0) return false;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = post.UserProfileId.Value,
                    EntityId = registerPostExchange.Id,
                    MainURL = "post/"+postExchange,
                    Message = MessageRaw.RegisterExchangeAcceptByOwnerPost + " "+ postExchangeEntity.Title,
                    RecipientId = registerPostExchange.UserRegisterId,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> AcceptRegisterPostExchangeByUserRegisterAsync(int id, UserIdentity<int> issuer)
        {
            try
            {
                var registerPostExchange = await _registerPostExchangeRepository.GetEntityByIdAsync(id);
                if (registerPostExchange == null)
                {
                    return false;
                }
                registerPostExchange.UserRegisterStatusId = ExchangePostUserRegister.Approve;
                registerPostExchange.StatusId = RegisterPostStatus.Done;
                registerPostExchange.UpdateBy(issuer);
                _registerPostExchangeRepository.Update(registerPostExchange);
                var post = await _postRepository.GetEntityByIdAsync(registerPostExchange.PostId);
                post.Statuts = PostStatus.Done;
                _postRepository.Update(post);
                if (registerPostExchange.PostExchangeId != null)
                {
                    var postExchangeEntity = await _postRepository.GetEntityByIdAsync(registerPostExchange.PostExchangeId.Value);
                    postExchangeEntity.Statuts = PostStatus.Done;
                    _postRepository.Update(postExchangeEntity);
                }
                if (post.UserProfileId == null) return false;
                if (await _uow.SaveChangesAsync() <= 0) return false;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = registerPostExchange.UserRegisterId,
                    EntityId = registerPostExchange.Id,
                    MainURL = "registerExchange/post/"+registerPostExchange.PostId,
                    Message = MessageRaw.RegisterExchangeAcceptByUserProfilePost,
                    RecipientId = post.UserProfileId.Value,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<bool> RejectRegisterPostExchangeByOwnerPostAsync(int id, MessageReject model, UserIdentity<int> issuer)
        {
            try
            {
                var registerPostExchange = await _registerPostExchangeRepository.GetEntityByIdAsync(id);
                if (registerPostExchange == null)
                {
                    return false;
                }
                registerPostExchange.StatusId = RegisterPostStatus.Rejected;
                registerPostExchange.PostOwnerStatusId = ExchangePostOwner.Rejected;
                registerPostExchange.RemarkPostOwnerReject = model.Message;
                registerPostExchange.UpdateBy(issuer);
                _registerPostExchangeRepository.Update(registerPostExchange);
                var post = await _postRepository.GetEntityByIdAsync(registerPostExchange.PostId);
                if (post.UserProfileId == null) return false;
                if (await _uow.SaveChangesAsync() <= 0) return false;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = post.UserProfileId.Value,
                    EntityId = registerPostExchange.Id,
                    MainURL = "registerList",
                    Message = MessageRaw.RegisterExchangeReject,
                    RecipientId = registerPostExchange.UserRegisterId,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<bool> RejectRegisterPostExchangeByUserRegisterAsync(int id, MessageReject model, UserIdentity<int> issuer)
        {
            try
            {
                var registerPostExchange = await _registerPostExchangeRepository.GetEntityByIdAsync(id);
                if (registerPostExchange == null)
                {
                    return false;
                }
                registerPostExchange.StatusId = RegisterPostStatus.Rejected;
                registerPostExchange.UserRegisterStatusId = ExchangePostUserRegister.Rejected;
                registerPostExchange.RemarkUserRegisterReject = model.Message;
                registerPostExchange.UpdateBy(issuer);
                _registerPostExchangeRepository.Update(registerPostExchange);
                var post = await _postRepository.GetEntityByIdAsync(registerPostExchange.PostId);
                if (post.UserProfileId == null) return false;
                if (await _uow.SaveChangesAsync() <= 0) return false;
                var notification = new NotificationClientModelRq()
                {
                    ActorId = registerPostExchange.UserRegisterId,
                    EntityId = registerPostExchange.Id,
                    MainURL = "registerList",
                    Message = MessageRaw.RegisterExchangeReject,
                    RecipientId = post.UserProfileId.Value,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
