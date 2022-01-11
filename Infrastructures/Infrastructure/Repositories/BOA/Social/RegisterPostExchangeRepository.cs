using System;
using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Social;
using ApplicationDomain.Helper;

namespace Infrastructure.Repositories.BOA
{
    public class RegisterPostExchangeRepository : GenericRepository<RegisterPostExchange, int>, IRegisterPostExchangeRepository
    {
        public RegisterPostExchangeRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetRegisterPostExchanges()
        {
            return dbSet.OrderBy(r => r.Remark);
        }

        public async Task<int> CountRegisterPostExchanges(DateTime fromDate, DateTime toDate)
        {
            var result = await dbSet.Where(r =>
                r.CreatedDate >= fromDate
                && r.CreatedDate <= toDate
                && r.StatusId == RegisterPostStatus.Done).ToListAsync();
            return result.Count();
        }
        public async Task<int> CountRegisterPostExchangesByUser(int userId,DateTime fromDate, DateTime toDate)
        {
            var result = await dbSet.Where(r =>
                r.CreatedDate >= fromDate
                && r.CreatedDate <= toDate
                && r.StatusId == RegisterPostStatus.Done && r.CreatedByUserId == userId).ToListAsync();
            return result.Count();
        }

        public IQueryable GetRegisterPostExchangeById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.Post);
        }

        public IQueryable GetRegisterPostExchangeByPostId(int id)
        {
            return dbSet.Where(d => d.PostId == id)
                .Include(r => r.PostExchange)
                .Include(r => r.UserRegister)
                .Include(r => r.Post)
                .ThenInclude(r => r.UserProfile); ;
        }
        public IQueryable GetRegisterPostExchangeByUserProfileId(int id)
        {
            return dbSet.Where(d => d.UserRegisterId == id)
                .Include(r => r.PostExchange)
                .Include(r => r.UserRegister)
                .Include(r => r.Post)
                .ThenInclude(r => r.UserProfile );
        }
        public IQueryable GetRegisterPostExchangeDoneByUserProfileId(int id)
        {
            return dbSet.Where(d => d.UserRegisterId == id && d.StatusId == RegisterPostStatus.Done)
                .Include(r => r.PostExchange)
                .Include(r => r.UserRegister)
                .Include(r => r.Post)
                .ThenInclude(r => r.UserProfile);
        }
        public IQueryable GetHistoryRegisterPostExchangeByUserProfileId(int id)
        {
            return dbSet.Where(d => d.UserRegisterId == id &&
                                    (d.StatusId == RegisterPostStatus.Rejected || d.StatusId == RegisterPostStatus.Done))
                .Include(r => r.UserRegister)
                .Include(r => r.Post)
                .ThenInclude(r => r.UserProfile);
        }
    }
}
