using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.BOA
{
    public class ImagePostRepository : GenericRepository<ImagePost, int>, IImagePostRepository
    {
        public ImagePostRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetImagePosts()
        {
            return dbSet.OrderBy(r => r.Id);
        }

        public IQueryable GetImagePostById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.Post);
        }

        public IQueryable GetImagePostByPostId(int id)
        {
            return dbSet.Where(d => d.PostId == id);
        }
        
    }
}
