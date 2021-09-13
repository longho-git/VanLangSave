using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.BOA
{
    public class UserProfileRepository : GenericRepository<UserProfile, int>, IUserProfileRepository
    {
        public UserProfileRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetUserProfiles()
        {
            return dbSet.OrderBy(r => r.FirstName);
        }

        public IQueryable GetUserProfileById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.User);
        }

        public IQueryable GetDistricByUserId(int id)
        {
            return dbSet.Where(d => d.UserId == id);
        }

        public async Task<bool> CheckCodeExistsAsync(string code)
        {
            return await dbSet.AnyAsync(r => r.Code == code);
        }
    }
}
