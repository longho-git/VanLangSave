using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IService;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Categories;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _CategoryService;
        public CategoryController(ICategoryService CategoryService)
        {
            _CategoryService = CategoryService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetCategoryAsyncs()
        {
            return Ok(await _CategoryService.GetCategorysAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetCategoryByIdAsync(int id)
        {
            return Ok(await _CategoryService.GetCategoryByIdAsync(id));
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateCategoryAsync([FromBody]CategoryModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _CategoryService.CreateCategoryAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateCategoryAsync(int id, [FromBody]CategoryModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _CategoryService.UpdateCategoryAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DelteCategoryAsync(int id)
        {
            try
            {
                return Ok(await _CategoryService.DeleteCategoryAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}