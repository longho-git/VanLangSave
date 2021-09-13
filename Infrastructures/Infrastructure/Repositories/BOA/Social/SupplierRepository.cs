using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.BOA
{
    public class SupplierRepository : GenericRepository<Supplier, int>, ISupplierRepository
    {
        public SupplierRepository(ApplicationDbContext dbContext) : base(dbContext)
        {

        }

        public IQueryable GetSuppliers()
        {
            return dbSet.OrderBy(r => r.Name);
        }

        public IQueryable GetSupplierById(int id)
        {
            return dbSet.Where(d => d.Id == id).Include(d => d.User);
        }

        public IQueryable GetSupplierByUserId(int id)
        {
            return dbSet.Where(d => d.UserId == id);
        }

       
    }
}
