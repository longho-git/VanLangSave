using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IProductNeedRepository : IGenericRepository<ProductNeed, int>
    {
        IQueryable GetProductNeeds();
        IQueryable GetProductNeedById(int id);
        IQueryable GetProductNeedByPostId(int id);
    }
}
