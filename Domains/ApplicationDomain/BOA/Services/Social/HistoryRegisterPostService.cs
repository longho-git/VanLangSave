using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;

using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Social;
using ApplicationDomain.BOA.IServices.Notification;
using ApplicationDomain.BOA.IServices.Social;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.RegisterPostGives;
using ApplicationDomain.BOA.Models.Social;
using ApplicationDomain.BOA.Models.Social.RegisterPostExchange;
using ApplicationDomain.BOA.Models.UserProfiles;
using ApplicationDomain.Helper;

namespace ApplicationDomain.BOA.Services
{
    public class HistoryRegisterPostService : ServiceBase, IHistoryRegisterPostService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly INotificationClientService _notificationClientService;
        private readonly IPostRepository _postRepository;
        private readonly IRegisterPostExchangeRepository _registerPostExchangeRepository;
        private readonly IRegisterPostGiveRepository _registerPostGiveRepository;
        public HistoryRegisterPostService(
            IRegisterPostGiveRepository registerPostGiveRepository,
            IRegisterPostExchangeRepository registerPostExchangeRepository,
            IUserProfileRepository userProfileRepository,
            INotificationClientService notificationClientService,
            IPostRepository postRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _registerPostGiveRepository = registerPostGiveRepository;
            _registerPostExchangeRepository = registerPostExchangeRepository;
            _notificationClientService = notificationClientService;
            _userProfileRepository = userProfileRepository;
            _postRepository = postRepository;

        }

        public async Task<List<HistoryRegisterPostModel>> GetHistoryRegisterPostAsync( UserIdentity<int> issuer)
        {
            try
            {
                var userRegister = await _userProfileRepository.GetDistricByUserId(issuer.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var result = new List<HistoryRegisterPostModel>();
             
                var registerGive = await _registerPostGiveRepository
                    .GetHistoryRegisterPostGiveByUserProfileId(userRegister[0].Id)
                    .MapQueryTo<RegisterPostGiveModel>(_mapper)
                    .ToListAsync();
                var registerExchange = await _registerPostExchangeRepository
                    .GetHistoryRegisterPostExchangeByUserProfileId(userRegister[0].Id)
                    .MapQueryTo<RegisterPostExchangeModel>(_mapper)
                    .ToListAsync();
                foreach (var item in registerGive)
                {
                    var model = new HistoryRegisterPostModel()
                    {
                        StatusId = item.StatusId,
                        PostId = item.PostId,
                        Remark = item.Remark,
                        PostTitle = item.Post.Title,
                        PostConditrion = "Tặng",
                        RegisterDate = item.CreatedDate,
                        Status = RegisterPost.GetName(item.StatusId),
                        UserId = item.Post.UserId

                    };
                    result.Add(model);
                }
                foreach (var item in registerExchange)
                {
                    var model = new HistoryRegisterPostModel()
                    {
                        StatusId = item.StatusId,
                        PostId = item.PostId,
                        Remark = item.Remark,
                        PostTitle = item.Post.Title,
                        PostConditrion = "Trao đổi",
                        RegisterDate = item.CreatedDate,
                        Status = RegisterPostStatus.GetName(item.StatusId),
                        UserId = item.Post.UserId

                    };
                    result.Add(model);
                }
                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<List<HistoryRegisterPostModel>> GetHistoryRegisterPostAllAsync()
        {
            try
            {
                var result = new List<HistoryRegisterPostModel>();

                var registerGive = await _registerPostGiveRepository
                    .GetRegisterPostGives()
                    .MapQueryTo<RegisterPostGiveModel>(_mapper)
                    .ToListAsync();
                var registerExchange = await _registerPostExchangeRepository
                    .GetRegisterPostExchanges()
                    .MapQueryTo<RegisterPostExchangeModel>(_mapper)
                    .ToListAsync();
                foreach (var item in registerGive)
                {
                    var model = new HistoryRegisterPostModel()
                    {
                        StatusId = item.StatusId,
                        PostId = item.PostId,
                        Remark = item.Remark,
                        PostTitle = item.Post.Title,
                        PostConditrion = "Tặng",
                        RegisterDate = item.CreatedDate,
                        Status = RegisterPost.GetName(item.StatusId),
                        UserId = item.Post.UserId

                    };
                    result.Add(model);
                }
                foreach (var item in registerExchange)
                {
                    var model = new HistoryRegisterPostModel()
                    {
                        StatusId = item.StatusId,
                        PostId = item.PostId,
                        Remark = item.Remark,
                        PostTitle = item.Post.Title,
                        PostConditrion = "Trao đổi",
                        RegisterDate = item.CreatedDate,
                        Status = RegisterPostStatus.GetName(item.StatusId),
                        UserId = item.Post.UserId

                    };
                    result.Add(model);
                }
                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
