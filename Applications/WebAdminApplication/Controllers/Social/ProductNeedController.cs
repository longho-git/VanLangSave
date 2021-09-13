using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.ProductNeeds;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class ProductNeedController : BaseController
    {
        private readonly IProductNeedService _ProductNeedService;
        public ProductNeedController(IProductNeedService ProductNeedService)
        {
            _ProductNeedService = ProductNeedService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetUserProfileAsyncs()
        {
            return Ok(await _ProductNeedService.GetProductNeedsAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetProductNeedByIdAsync(int id)
        {
            return Ok(await _ProductNeedService.GetProductNeedByIdAsync(id));
        }
        [Route("PostId/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetProductNeedByPostIdAsync(int id)
        {
            try
            {
                return Ok(await _ProductNeedService.GetProductNeedByPostIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateUserProfileAsync([FromBody]ProductNeedModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _ProductNeedService.CreateProductNeedAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAsync(int id, [FromBody] ProductNeedModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _ProductNeedService.UpdateProductNeedAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteProductNeedAsync(int id)
        {
            try
            {
                return Ok(await _ProductNeedService.DeleteProductNeedAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}