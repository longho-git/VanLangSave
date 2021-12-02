using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Notification;

namespace Infrastructure.Repositories.BOA
{
    public class NotificationClientRepository : GenericRepository<NotificationClient, int>, INotificationClientRepository
    {
        public NotificationClientRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

      

        public IQueryable GetNotificationClients()
        {
            return this.dbSet.OrderBy(r=>r.CreatedDate);
        }

        public IQueryable GetNotificationClientById(int id)
        {
            return dbSet.Where(r => r.Id == id);
        }
    }
}
