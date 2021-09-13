using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.SupplierSuggests;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IServices
{
    public interface ISupplierSuggestService
    {
        Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestsAsync();
        Task<SupplierSuggestModel> GetSupplierSuggestByIdAsync(int id);
        Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestBySupplierIdAsync(int id);
        Task<int> CreateSupplierSuggestAsync(SupplierSuggestModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdateSupplierSuggestAsync(int id, SupplierSuggestModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteSupplierSuggestAsync(int id);
        Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestByProductNeedIdAsync(int id);
        Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestByUserIdAsync(int id);
    }
}
