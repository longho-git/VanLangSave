using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.ProductNeeds;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IServices
{
    public interface IProductNeedService
    {
        Task<IEnumerable<ProductNeedModel>> GetProductNeedsAsync();
        Task<ProductNeedModel> GetProductNeedByIdAsync(int id);
        Task<IEnumerable<ProductNeedModel>> GetProductNeedByPostIdAsync(int id);
        Task<int> CreateProductNeedAsync(ProductNeedModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdateProductNeedAsync(int id, ProductNeedModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteProductNeedAsync(int id);
  
    }
}
