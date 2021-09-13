using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Suppliers;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class SupplierController : BaseController
    {
        private readonly ISupplierService _SupplierService;
        public SupplierController(ISupplierService SupplierService)
        {
            _SupplierService = SupplierService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierAsyncs()
        {
            return Ok(await _SupplierService.GetSuppliersAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierByIdAsync(int id)
        {
            return Ok(await _SupplierService.GetSupplierByIdAsync(id));
        }
        [Route("userId/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierByUserIdAsync(int id)
        {
            try
            {
                return Ok(await _SupplierService.GetSupplierByUserIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateSupplierAsync([FromBody]SupplierModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _SupplierService.CreateSupplierAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateSupplierAsync(int id, [FromBody]SupplierModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _SupplierService.UpdateSupplierAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DelteSupplierAsync(int id)
        {
            try
            {
                return Ok(await _SupplierService.DeleteSupplierAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}