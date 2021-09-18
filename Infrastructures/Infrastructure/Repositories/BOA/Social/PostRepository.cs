using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.BOA
{
    public class PostRepository : GenericRepository<Post, int>, IPostRepository
    {
        public PostRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetPostsActive()
        {
            return dbSet
                .Where(r => r.Active == true)
                    .OrderByDescending(r => r.CreatedDate);
        }
        public IQueryable GetPosts()
        {
            return dbSet
                    .OrderBy(r => r.Content);
        }

        public IQueryable GetPostById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.User);
        }
        public IQueryable GetPostsCategoryId(int CategoryId)
        {
            return dbSet
                .Where(r => r.Active == true && r.CategoryId == CategoryId)
                    .OrderByDescending(r => r.CreatedDate);
        }

        public IQueryable GetPostByUserId(int id)
        {
            return dbSet.Where(d => d.UserId == id);
        }
        
    }
}
