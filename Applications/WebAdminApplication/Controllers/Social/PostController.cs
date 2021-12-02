using System;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models.Posts;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers.Social
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
        [Route("admin/active")]
        [HttpGet]
        public async Task<IActionResult> GetPostsActiveAdminAsync()
        {
            try
            {
                return Ok(await _postService.GetPostsActiveAdminAsync());
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

        [Route("waiting")]
        [HttpGet]
        public async Task<IActionResult> GetPostsWaitingAsync()
        {
            var issuer = GetCurrentUserIdentity<int>();
            if (issuer == null)
            {
                return BadRequest("Vui lòng đăng nhập !!!");
            }
            return Ok(await _postService.GetPostsWaitingAsync());
        }


        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetPostByIdAsync(int id)
        {
            return Ok(await _postService.GetPostByIdAsync(id));
        }
        [Route("userId/{statusId}")]
        [HttpGet]
        public async Task<IActionResult> GetPostByUserIdStatusAsync(int statusId)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.GetPostOfUserIdAsync(issuer.Id, statusId));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("userId")]
        [HttpGet]
        public async Task<IActionResult> GetAllPostByUserIdAsync()
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.GetAllPostOfUserIdAsync(issuer.Id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("active/userProfileId/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetPostByUserIdAsync(int id)
        {
            try
            {
                return Ok(await _postService.GetPostByUserProfileIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("search/{searchTitle}")]
        [HttpGet]
        public async Task<IActionResult> SearchPostByUserIdAsync(string searchTitle)
        {
            try
            {
                return Ok(await _postService.SearchPostsActiveAsync(searchTitle));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("active/userId")]
        [HttpGet]
        public async Task<IActionResult> GetPostActiveByUserIdAsync()
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.GetPostActiveOfUserIdAsync(issuer.Id));
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

        [Route("active/{id}")]
        [HttpPut]
        public async Task<IActionResult> ActivePostAsync(int id)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.ApprovePostAsync(id, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("rejected/{id}")]
        [HttpPut]
        public async Task<IActionResult> RejectedPostAsync(int id)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.RejectedPostAsync(id, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("hidden/{id}")]
        [HttpPut]
        public async Task<IActionResult> HiddenPostAsync(int id)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _postService.HiddenPostAsync(id, issuer));
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