using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Notifi;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IUserNotificationRepository : IGenericRepository<UserNotification, int>
    {
        IQueryable GetUserNotifications();
        IQueryable GetUserNotificationById(int id);
        IQueryable GetUserNotificationByUserId(int userId);

    }
}
