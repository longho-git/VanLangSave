using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Suppliers;
using ApplicationDomain.BOA.Models.SupplierSuggests;
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
    public class SupplierSuggestService : ServiceBase, ISupplierSuggestService
    {
        private readonly ISupplierSuggestRepository _SupplierSuggestRepository;
        private readonly ISupplierRepository _SupplierRepository;
        private readonly IProvinceRepository _provinceRepository;
        public SupplierSuggestService(
            ISupplierSuggestRepository SupplierSuggestRepository,
            ISupplierRepository SupplierRepository,
            IProvinceRepository provinceRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _SupplierSuggestRepository = SupplierSuggestRepository;
            _SupplierRepository = SupplierRepository;
            _provinceRepository = provinceRepository;
        }

        public async Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestsAsync()
        {
            return await _SupplierSuggestRepository.GetSupplierSuggests().MapQueryTo<SupplierSuggestModel>(_mapper).ToListAsync();
        }

        public async Task<SupplierSuggestModel> GetSupplierSuggestByIdAsync(int id)
        {
            return await _SupplierSuggestRepository.GetSupplierSuggestById(id).MapQueryTo<SupplierSuggestModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateSupplierSuggestAsync(SupplierSuggestModelRq model, UserIdentity<int> issuer)
        {
            try
            {
              var surpplier =  await _SupplierRepository.GetSupplierByUserId(issuer.Id).MapQueryTo<SupplierModel>(_mapper).FirstOrDefaultAsync();
                var SupplierSuggest = _mapper.Map<SupplierSuggest>(model);
                SupplierSuggest.CreateBy(issuer).UpdateBy(issuer);
                SupplierSuggest.SupplierId = surpplier.Id;
                _SupplierSuggestRepository.Create(SupplierSuggest);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return SupplierSuggest.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestBySupplierIdAsync(int id)
        {
            return await _SupplierSuggestRepository.GetSupplierSuggestBySupplierId(id).MapQueryTo<SupplierSuggestModel>(_mapper).ToListAsync();
        }
        public async Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestByUserIdAsync(int id)
        {
            return await _SupplierSuggestRepository.GetSupplierSuggestByUserId(id).MapQueryTo<SupplierSuggestModel>(_mapper).ToListAsync();
        }

        public async Task<IEnumerable<SupplierSuggestModel>> GetSupplierSuggestByProductNeedIdAsync(int id)
        {
            return await _SupplierSuggestRepository.GetSupplierSuggestByProductNeedId(id).MapQueryTo<SupplierSuggestModel>(_mapper).ToListAsync();
        }

        public async Task<bool> UpdateSupplierSuggestAsync(int id, SupplierSuggestModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var SupplierSuggest = await _SupplierSuggestRepository.GetEntityByIdAsync(id);
                if (SupplierSuggest == null)
                {
                    return false;
                }
                _mapper.Map(model, SupplierSuggest);
                SupplierSuggest.UpdateBy(issuer);
                _SupplierSuggestRepository.Update(SupplierSuggest);
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

        public async Task<bool> DeleteSupplierSuggestAsync(int id)
        {
            try
            {
                var SupplierSuggest = await _SupplierSuggestRepository.GetEntityByIdAsync(id);
                _SupplierSuggestRepository.Delete(SupplierSuggest);
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
