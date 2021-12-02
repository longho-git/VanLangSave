using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Notifi;
using ApplicationDomain.BOA.Entities.Notification;
using ApplicationDomain.BOA.IServices.Notification;

namespace ApplicationDomain.BOA.Services
{
    public class UserNotificationService : ServiceBase, IUserNotificationService
    {
        private readonly IUserNotificationRepository _userNotificationRepository;
        public UserNotificationService(
            IUserNotificationRepository userNotificationRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _userNotificationRepository = userNotificationRepository;
        }

        public async Task<int> CreateUserNotificationAsync(UserNotificationModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var entity = _mapper.Map<UserNotification>(model);
                entity.IsRead = false;
                entity.CreateBy(issuer).UpdateBy(issuer);
                _userNotificationRepository.Create(entity);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return entity.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> DeleteUserNotificationAsync(int id)
        {
            try
            {
                var entity = await _userNotificationRepository.GetEntityByIdAsync(id);
                _userNotificationRepository.Delete(entity);
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

        public async Task<IEnumerable<UserNotificationModel>> GetUserNotificationsAsync()
        {
            return await _userNotificationRepository.GetUserNotifications().MapQueryTo<UserNotificationModel>(_mapper).ToListAsync();
           
        }

        public async Task<UserNotificationModel> GetUserNotificationByIdAsync(int id)
        {
            return await _userNotificationRepository.GetUserNotificationById(id).MapQueryTo<UserNotificationModel>(_mapper).FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<UserNotificationModel>> GetUserNotificationByUserProfileIdAsync(int id)
        {
            return await _userNotificationRepository.GetUserNotificationByUserId(id).MapQueryTo<UserNotificationModel>(_mapper).ToListAsync();
        }

        public async Task<bool> UpdateUserNotificationAsync(int id, UserNotificationModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var entity = await _userNotificationRepository.GetEntityByIdAsync(id);
                if (entity == null)
                {
                    return false;
                }
                _mapper.Map(model, entity);
                entity.UpdateBy(issuer);
                _userNotificationRepository.Update(entity);
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