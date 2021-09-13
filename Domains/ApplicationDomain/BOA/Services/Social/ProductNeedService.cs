using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models.ProductNeeds;

using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;

using System.Threading.Tasks;

namespace ApplicationDomain.BOA.Services
{
    public class ProductNeedService : ServiceBase, IProductNeedService
    {
        private readonly IProductNeedRepository _ProductNeedRepository;
        
        public ProductNeedService(
            IProductNeedRepository ProductNeedRepository,
          
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _ProductNeedRepository = ProductNeedRepository;
          
        }

        public async Task<IEnumerable<ProductNeedModel>> GetProductNeedsAsync()
        {
            return await _ProductNeedRepository.GetProductNeeds().MapQueryTo<ProductNeedModel>(_mapper).ToListAsync();
        }

        public async Task<ProductNeedModel> GetProductNeedByIdAsync(int id)
        {
            return await _ProductNeedRepository.GetProductNeedById(id).MapQueryTo<ProductNeedModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateProductNeedAsync(ProductNeedModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var ProductNeed = _mapper.Map<ProductNeed>(model);
                ProductNeed.CreateBy(issuer).UpdateBy(issuer);
                _ProductNeedRepository.Create(ProductNeed);
                if (await _uow.SaveChangesAsync() == 1)
                {

                    return ProductNeed.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<IEnumerable<ProductNeedModel>> GetProductNeedByPostIdAsync(int id)
        {
            return await _ProductNeedRepository.GetProductNeedByPostId(id).MapQueryTo<ProductNeedModel>(_mapper).ToListAsync();
        }

        public async Task<bool> UpdateProductNeedAsync(int id, ProductNeedModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var ProductNeed = await _ProductNeedRepository.GetEntityByIdAsync(id);
                if (ProductNeed == null)
                {
                    return false;
                }
                _mapper.Map(model, ProductNeed);
                ProductNeed.UpdateBy(issuer);
                _ProductNeedRepository.Update(ProductNeed);
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

        public async Task<bool> DeleteProductNeedAsync(int id)
        {
            try
            {
                var ProductNeed = await _ProductNeedRepository.GetEntityByIdAsync(id);
                _ProductNeedRepository.Delete(ProductNeed);
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
