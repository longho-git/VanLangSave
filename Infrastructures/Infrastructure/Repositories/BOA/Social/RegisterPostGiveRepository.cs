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
