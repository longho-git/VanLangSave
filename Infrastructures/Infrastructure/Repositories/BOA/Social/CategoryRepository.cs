using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositorie;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.BOA
{
    public class CategoryRepository : GenericRepository<Category, int>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetCategories()
        {
            return dbSet.OrderBy(r => r.Id);
        }

        public IQueryable GetCategoryById(int id)
        {
            return dbSet.Where(d => d.Id == id);
        }
       
    }
}
