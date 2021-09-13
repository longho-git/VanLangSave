using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.SupplierSuggests;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class SupplierSuggestController : BaseController
    {
        private readonly ISupplierSuggestService _SupplierSuggestService;
        public SupplierSuggestController(ISupplierSuggestService SupplierSuggestService)
        {
            _SupplierSuggestService = SupplierSuggestService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierSuggestAsyncs()
        {
            return Ok(await _SupplierSuggestService.GetSupplierSuggestsAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierSuggestByIdAsync(int id)
        {
            return Ok(await _SupplierSuggestService.GetSupplierSuggestByIdAsync(id));
        }

        [Route("userId/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierSuggestByUserIdAsync(int id)
        {
            try
            {
                return Ok(await _SupplierSuggestService.GetSupplierSuggestByUserIdAsync(id));
            }
            catch (Exception e)
            {

                throw e ;
            }
         
        }

        [Route("supplier")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierSuggestBySupplierIdAsync()
        {
        
            try
            {
                var issuer = GetCurrentUserIdentity<int>();
                return Ok(await _SupplierSuggestService.GetSupplierSuggestBySupplierIdAsync(issuer.Id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("productneed/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetSupplierSuggestByProductNeedIdAsync(int id)
        {
            try
            {
                return Ok(await _SupplierSuggestService.GetSupplierSuggestByProductNeedIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateSupplierSuggestAsync([FromBody]SupplierSuggestModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _SupplierSuggestService.CreateSupplierSuggestAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateSupplierSuggestAsync(int id, [FromBody]SupplierSuggestModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _SupplierSuggestService.UpdateSupplierSuggestAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DelteSupplierSuggestAsync(int id)
        {
            try
            {
                return Ok(await _SupplierSuggestService.DeleteSupplierSuggestAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}