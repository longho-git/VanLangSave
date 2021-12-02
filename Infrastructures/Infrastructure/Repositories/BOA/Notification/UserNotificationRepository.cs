using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Notifi;

namespace Infrastructure.Repositories.BOA
{
    public class UserNotificationRepository : GenericRepository<UserNotification, int>, IUserNotificationRepository
    {
        public UserNotificationRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
        public IQueryable GetUserNotifications()
        {
            return this.dbSet.OrderBy(r=>r.CreatedDate);
        }

        public IQueryable GetUserNotificationById(int id)
        {
            return dbSet.Where(r => r.Id == id);
        }
        public IQueryable GetUserNotificationByUserId(int userId)
        {
            return dbSet.Where(r => r.RecipientId == userId)
                .Include(r=>r.Notification).ThenInclude(r=>r.Actor).OrderByDescending(r=>r.CreatedDate);
        }
    }
}
