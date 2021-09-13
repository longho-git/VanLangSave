using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Suppliers;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IServices
{
    public interface ISupplierService
    {
        Task<IEnumerable<SupplierModel>> GetSuppliersAsync();
        Task<SupplierModel> GetSupplierByIdAsync(int id);
        Task<IEnumerable<SupplierModel>> GetSupplierByUserIdAsync(int id);
        Task<int> CreateSupplierAsync(SupplierModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdateSupplierAsync(int id, SupplierModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteSupplierAsync(int id);

    }
}
