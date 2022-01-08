using System;
using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.Helper;

namespace Infrastructure.Repositories.BOA
{
    public class RegisterPostGiveRepository : GenericRepository<RegisterPostGive, int>, IRegisterPostGiveRepository
    {
        public RegisterPostGiveRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetRegisterPostGives()
        {
            return dbSet.OrderBy(r => r.Remark);
        }

        public async Task<int> CountRegisterPostGives(DateTime fromDate, DateTime toDate)
        {
            var result = await dbSet.Where(r =>
                r.CreatedDate >= fromDate
                && r.CreatedDate <= toDate && r.StatusId == RegisterPost.Approve).ToListAsync();
            return result.Count();
        }
        public async Task<int> CountRegisterPostGiveByUser(int userId, DateTime fromDate, DateTime toDate)
        {
            var result = await dbSet.Where(r =>
                r.CreatedDate >= fromDate
                && r.CreatedDate <= toDate
                && r.StatusId == RegisterPost.Approve && r.CreatedByUserId == userId).ToListAsync();
            return result.Count();
        }

        public IQueryable GetRegisterPostGiveById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.Post);
        }

        public IQueryable GetRegisterPostGiveByPostId(int id)
        {
            return dbSet.Where(d => d.PostId == id);
        }
        public IQueryable GetRegisterPostGiveByUserProfileId(int id)
        {
            return dbSet.Where(d => d.UserRegisterId == id)
                .Include(r=>r.UserRegister)
                .Include(r=>r.Post)
                .ThenInclude(r=>r.UserProfile);
        }
        public IQueryable GetHistoryRegisterPostGiveByUserProfileId(int id)
        {
            return dbSet.Where(d => d.UserRegisterId == id &&
                                    (d.StatusId == RegisterPost.Rejected || d.StatusId == RegisterPost.Approve))
                .Include(r => r.UserRegister)
                .Include(r => r.Post)
                .ThenInclude(r => r.UserProfile);
        }
    }
}
