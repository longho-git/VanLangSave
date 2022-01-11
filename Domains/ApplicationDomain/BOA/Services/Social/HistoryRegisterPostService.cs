using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.IServices.Notification;
using ApplicationDomain.BOA.Models.RegisterPostGives;
using ApplicationDomain.BOA.Models.Social;
using ApplicationDomain.BOA.Models.Social.RegisterPostExchange;
using ApplicationDomain.BOA.Models.UserProfiles;
using ApplicationDomain.Helper;
using ApplicationDomain.Identity.IRepositories;
using ApplicationDomain.Identity.Models;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDomain.BOA.Services.Social
{
    public class HistoryRegisterPostService : ServiceBase, IHistoryRegisterPostService
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IRegisterPostExchangeRepository _registerPostExchangeRepository;
        private readonly IRegisterPostGiveRepository _registerPostGiveRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPostRepository _postRepository;
        public HistoryRegisterPostService(
            IRegisterPostGiveRepository registerPostGiveRepository,
            IRegisterPostExchangeRepository registerPostExchangeRepository,
            IUserProfileRepository userProfileRepository,
            IMapper mapper,
            IUserRepository userRepository,
            IPostRepository postRepository,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _registerPostGiveRepository = registerPostGiveRepository;
            _registerPostExchangeRepository = registerPostExchangeRepository;
            _userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
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

        public async Task<StaticsticModel> GetStaticstic(DateTime fromDate, DateTime toDate)
        {
            var result = new StaticsticModel();
            var listUserStatis = new List<StaticsticUserModel>();
            var countUser = await _userRepository.GetCountUserFromTo(fromDate, toDate);
            var countPost = await _postRepository.GetPostCountFromTo(fromDate, toDate);
            var transExchange = await _registerPostExchangeRepository.CountRegisterPostExchanges(fromDate, toDate);
            var transGive = await _registerPostGiveRepository.CountRegisterPostGives(fromDate, toDate);
            var totalTrans = transGive + transExchange;
            result.CountUser = countUser > 0 ? countUser : 0;
            result.CountPost = countPost > 0 ? countPost : 0;
            result.CountTrans = totalTrans > 0 ? totalTrans : 0;
            var userList = _userRepository.GetUsers().Cast<UserModel>();
            foreach (var user in userList)
            {
                var countPostByUser = await _postRepository.GetPostCountFromToByUserId(user.Id, fromDate, toDate);
                var transExchangeOfUser = await _registerPostExchangeRepository.CountRegisterPostExchangesByUser(user.Id,fromDate, toDate);
                var transGiveOfUser = await _registerPostGiveRepository.CountRegisterPostGiveByUser(user.Id,fromDate, toDate);
                var userProfile = await _userProfileRepository.GetDistricByUserId(user.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var userStaticstic = new StaticsticUserModel()
                {
                    Name = userProfile[0].FirstName+" "+userProfile[0].LastName,
                    Email = user.Email,
                    CountPost = countPostByUser ,
                    CountTrans = transExchangeOfUser + transGiveOfUser
                };
                listUserStatis.Add(userStaticstic);
            }

            result.UserList = listUserStatis;
            return result;
        }
    }
}
