using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositorie;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IService;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Categories;
using AspNetCore.AutoGenerate;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.Services
{
    public class CategoryService : ServiceBase, ICategoryService
    {
        private readonly ICategoryRepository _CategoryRepository;
        private readonly IProvinceRepository _provinceRepository;
        public CategoryService(
            ICategoryRepository CategoryRepository,
            IProvinceRepository provinceRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _CategoryRepository = CategoryRepository;
            _provinceRepository = provinceRepository;
        }

        public async Task<IEnumerable<CategoryModel>> GetCategorysAsync()
        {
            return await _CategoryRepository.GetCategories().MapQueryTo<CategoryModel>(_mapper).ToListAsync();
        }

        public async Task<CategoryModel> GetCategoryByIdAsync(int id)
        {
            return await _CategoryRepository.GetCategoryById(id).MapQueryTo<CategoryModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateCategoryAsync(CategoryModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var Category = _mapper.Map<Category>(model);
                Category.CreateBy(issuer).UpdateBy(issuer);
                _CategoryRepository.Create(Category);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return Category.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
     

        public async Task<bool> UpdateCategoryAsync(int id, CategoryModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var Category = await _CategoryRepository.GetEntityByIdAsync(id);
                if (Category == null)
                {
                    return false;
                }
                _mapper.Map(model, Category);
                Category.UpdateBy(issuer);
                _CategoryRepository.Update(Category);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            try
            {
                var Category = await _CategoryRepository.GetEntityByIdAsync(id);
                _CategoryRepository.Delete(Category);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
