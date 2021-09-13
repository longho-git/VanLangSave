using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Suppliers;
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
    public class SupplierService : ServiceBase, ISupplierService
    {
        private readonly ISupplierRepository _SupplierRepository;
        private readonly IProvinceRepository _provinceRepository;
        public SupplierService(
            ISupplierRepository SupplierRepository,
            IProvinceRepository provinceRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _SupplierRepository = SupplierRepository;
            _provinceRepository = provinceRepository;
        }

        public async Task<IEnumerable<SupplierModel>> GetSuppliersAsync()
        {
            return await _SupplierRepository.GetSuppliers().MapQueryTo<SupplierModel>(_mapper).ToListAsync();
        }

        public async Task<SupplierModel> GetSupplierByIdAsync(int id)
        {
            return await _SupplierRepository.GetSupplierById(id).MapQueryTo<SupplierModel>(_mapper).FirstOrDefaultAsync();
        }

        public async Task<int> CreateSupplierAsync(SupplierModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var Supplier = _mapper.Map<Supplier>(model);
                Supplier.CreateBy(issuer).UpdateBy(issuer);
                _SupplierRepository.Create(Supplier);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return Supplier.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<IEnumerable<SupplierModel>> GetSupplierByUserIdAsync(int id)
        {
            return await _SupplierRepository.GetSupplierByUserId(id).MapQueryTo<SupplierModel>(_mapper).ToListAsync();
        }

        public async Task<bool> UpdateSupplierAsync(int id, SupplierModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var Supplier = await _SupplierRepository.GetEntityByIdAsync(id);
                if (Supplier == null)
                {
                    return false;
                }
                _mapper.Map(model, Supplier);
                Supplier.UpdateBy(issuer);
                _SupplierRepository.Update(Supplier);
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

        public async Task<bool> DeleteSupplierAsync(int id)
        {
            try
            {
                var Supplier = await _SupplierRepository.GetEntityByIdAsync(id);
                _SupplierRepository.Delete(Supplier);
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
