using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.BOA
{
    public class ProductNeedRepository : GenericRepository<ProductNeed, int>, IProductNeedRepository
    {
        public ProductNeedRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetProductNeeds()
        {
            return dbSet.OrderBy(r => r.Content);
        }

        public IQueryable GetProductNeedById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.Post);
        }

        public IQueryable GetProductNeedByPostId(int id)
        {
            return dbSet.Where(d => d.PostId == id);
        }
        
    }
}
