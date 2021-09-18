using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Posts;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class PostController : BaseController
    {
        private readonly IPostService _postService;
        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [Route("active")]
        [HttpGet]
        public async Task<IActionResult> GetPostsActiveAsync()
        {
            try
            {
                return Ok(await _postService.GetPostsActiveAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("category/{categoryId}")]
        [HttpGet]
        public async Task<IActionResult> GetPostsCategoryIdAsync(int categoryId)
        {
            try
            {
                return Ok(await _postService.GetPostsByCategoryIdAsync(categoryId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetPostsAsync()
        {
            var issuer = GetCurrentUserIdentity<int>();
            if (issuer == null)
            {
                return BadRequest("Vui lòng đăng nhập !!!");
            }
            return Ok(await _postService.GetPostsAsync());
        }


        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetPostByIdAsync(int id)
        {
            return Ok(await _postService.GetPostByIdAsync(id));
        }
        [Route("userId")]
        [HttpGet]
        public async Task<IActionResult> GetPostByUserIdAsync()
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.GetPostOfUserIdAsync(issuer.Id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateUserProfileAsync([FromBody]PostModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                if (issuer ==null)
                {
                    return BadRequest("Vui lòng đăng nhập !!!");
                }
                return Ok(await _postService.CreatePostAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAsync(int id, [FromBody] PostModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.UpdatePostAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("active/{id}/{active}")]
        [HttpPut]
        public async Task<IActionResult> ActivePostAsync(int id, int active)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.ActivePostAsync(id, active, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeletePostAsync(int id)
        {
            try
            {
                return Ok(await _postService.DeletePostAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}