using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.BOA
{
    public class SupplierSuggestRepository : GenericRepository<SupplierSuggest, int>, ISupplierSuggestRepository
    {
        public SupplierSuggestRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetSupplierSuggests()
        {
            return dbSet.OrderBy(r => r.Title);
        }

        public IQueryable GetSupplierSuggestById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.ProductNeed).Include(d => d.Supplier);
        }
        public IQueryable GetSupplierSuggestByUserId(int userId)
        {
            return dbSet.Include(d => d.ProductNeed).ThenInclude(d => d.Post).ThenInclude(d => d.User).Where(d => d.Id == userId);
        }

        public IQueryable GetSupplierSuggestBySupplierId(int id)
        {
            return dbSet.Where(d => d.SupplierId == id);
        }
        public IQueryable GetSupplierSuggestByProductNeedId(int id)
        {
            return dbSet.Where(d => d.ProductNeedId == id);
        }

    }
}
