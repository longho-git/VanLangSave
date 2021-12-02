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
using ApplicationDomain.BOA.SIgnalR;
using Microsoft.AspNetCore.SignalR;

namespace ApplicationDomain.BOA.Services
{
    public class NotificationClientService : ServiceBase, INotificationClientService
    {
        private readonly INotificationClientRepository _notificationClientRepository;
        private readonly IUserNotificationRepository _userNotificationRepository;
        private IHubContext<SignalrHub, IHubClient> _signalrHub;
        public NotificationClientService(
            INotificationClientRepository notificationClientRepository,
            IUserNotificationRepository userNotificationRepository,
            IHubContext<SignalrHub, IHubClient> signalrHub,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _notificationClientRepository = notificationClientRepository;
            _userNotificationRepository = userNotificationRepository;
            _signalrHub = signalrHub;
        }

        public async Task<int> CreateNotificationAsync(NotificationClientModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var entity = _mapper.Map<NotificationClient>(model);
                entity.CreateBy(issuer).UpdateBy(issuer);
                _notificationClientRepository.Create(entity);
                if (await _uow.SaveChangesAsync() <= 0) return 0;
                var userNotification = new UserNotificationModelRq()
                {
                    IsRead = false,
                    RecipientId = model.RecipientId,
                    NotificationId = entity.Id,
                };
                var entityUserNotification = _mapper.Map<UserNotification>(userNotification);
                entityUserNotification.CreateBy(issuer).UpdateBy(issuer);
                _userNotificationRepository.Create(entityUserNotification);
                if (await _uow.SaveChangesAsync() <= 0) return 0;
                var message = new UserNotificationModel()
                {
                    Id = entityUserNotification.Id,
                    RecipientId = entityUserNotification.RecipientId,
                    Notification = entity,
                    IsRead = entityUserNotification.IsRead,
                    NotificationId = entity.Id,
                };
                await _signalrHub.Clients.All.BroadcastMessage(message);
                return entity.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> DeleteNotificationClientAsync(int id)
        {
            try
            {
                var entity = await _notificationClientRepository.GetEntityByIdAsync(id);
                _notificationClientRepository.Delete(entity);
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

        public async Task<IEnumerable<NotificationClientModel>> GetNotificationClientsAsync()
        {
            return await _notificationClientRepository.GetNotificationClients().MapQueryTo<NotificationClientModel>(_mapper).ToListAsync();
           
        }

        public async Task<NotificationClientModel> GetNotificationClientByIdAsync(int id)
        {
            return await _notificationClientRepository.GetNotificationClientById(id).MapQueryTo<NotificationClientModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateNotificationClientAsync(int id, NotificationClientModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var entity = await _notificationClientRepository.GetEntityByIdAsync(id);
                if (entity == null)
                {
                    return false;
                }
                _mapper.Map(model, entity);
                entity.UpdateBy(issuer);
                _notificationClientRepository.Update(entity);
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