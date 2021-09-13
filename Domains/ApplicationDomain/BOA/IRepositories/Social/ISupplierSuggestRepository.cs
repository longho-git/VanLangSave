using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface ISupplierSuggestRepository : IGenericRepository<SupplierSuggest, int>
    {
        IQueryable GetSupplierSuggests();
        IQueryable GetSupplierSuggestById(int id);
        IQueryable GetSupplierSuggestByProductNeedId(int id);
        IQueryable GetSupplierSuggestBySupplierId(int id);
        IQueryable GetSupplierSuggestByUserId(int userId);
    }
}
