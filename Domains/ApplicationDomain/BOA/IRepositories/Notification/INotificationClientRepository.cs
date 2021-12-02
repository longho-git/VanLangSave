using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Notification;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface INotificationClientRepository : IGenericRepository<NotificationClient, int>
    {
        IQueryable GetNotificationClients();
        IQueryable GetNotificationClientById(int id);

    }
}
