using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Categories;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IService
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryModel>> GetCategorysAsync();
        Task<CategoryModel> GetCategoryByIdAsync(int id);
        Task<int> CreateCategoryAsync(CategoryModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdateCategoryAsync(int id, CategoryModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteCategoryAsync(int id);

    }
}
