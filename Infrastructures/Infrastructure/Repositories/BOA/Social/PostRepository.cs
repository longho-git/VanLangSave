using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.Helper;
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
                .Where(r => r.Active == true && r.Statuts != PostStatus.Hidden && r.Statuts != PostStatus.Done)
                    .OrderByDescending(r => r.CreatedDate);
        }
        public IQueryable GetPostsWaiting()
        {
            return dbSet
                .Where(d => d.Statuts == 1)
                    .OrderBy(r => r.CreatedDate);
        }

        public IQueryable GetPostById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.User);
        }
        public IQueryable GetPostsCategoryId(int CategoryId)
        {
            return dbSet
                .Where(r => r.Active == true && r.CategoryId == CategoryId && r.Statuts != PostStatus.Hidden && r.Statuts != PostStatus.Done)
                    .OrderByDescending(r => r.CreatedDate);
        }

        public IQueryable GetPostByUserId(int id ,int statusId)
        {
            return dbSet.Where(d => d.UserId == id && d.Statuts == statusId);
        }

        public IQueryable GetAllPostByUserId(int id)
        {
            return dbSet.Where(d => d.UserId == id );
        }
        public IQueryable GetPostByUserProfileId(int id)
        {
            return dbSet.Where(d => d.UserProfileId == id && d.Statuts == PostStatus.Approve && d.Active == true && d.Type==2);
        }
        public IQueryable GetPostActiveByUserId(int id)
        {
            return dbSet.Where(r => r.UserId == id && r.Statuts != PostStatus.Hidden && r.Statuts != PostStatus.Done);
        }
        public IQueryable SearchPostsActive(string searchTitle)
        {
            return dbSet
                .Where(r => r.Active == true && r.Statuts != PostStatus.Hidden && r.Statuts != PostStatus.Done && r.Title.Contains(searchTitle))
                .OrderByDescending(r => r.CreatedDate);
        }
    }
}
