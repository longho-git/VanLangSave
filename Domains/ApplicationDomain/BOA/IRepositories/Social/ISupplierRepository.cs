using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface ISupplierRepository : IGenericRepository<Supplier, int>
    {
        IQueryable GetSuppliers();
        IQueryable GetSupplierById(int id);
        IQueryable GetSupplierByUserId(int id);
    }
}
