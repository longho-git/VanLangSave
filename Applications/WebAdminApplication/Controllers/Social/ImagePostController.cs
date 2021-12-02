using System;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers.Social
{
    public class ImagePostController : BaseController
    {
        private readonly IImagePostService _ImagePostService;
        public ImagePostController(IImagePostService ImagePostService)
        {
            _ImagePostService = ImagePostService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetUserProfileAsyncs()
        {
            return Ok(await _ImagePostService.GetImagePostsAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetImagePostByIdAsync(int id)
        {
            return Ok(await _ImagePostService.GetImagePostByIdAsync(id));
        }
        [Route("postId")]
        [HttpGet]
        public async Task<IActionResult> GetImagePostByUserIdAsync()
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _ImagePostService.GetImagePostByPostIdAsync(issuer.Id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }


        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAsync(int id, [FromBody] ImagePostModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _ImagePostService.UpdateImagePostAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteImagePostAsync(int id)
        {
            try
            {
                return Ok(await _ImagePostService.DeleteImagePostAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}