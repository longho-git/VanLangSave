using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class UserProfileController : BaseController
    {
        private readonly IUserProfileService _userProfileService;
        public UserProfileController(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetUserProfileAsyncs()
        {
            return Ok(await _userProfileService.GetUserProfilesAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetUserProfileByIdAsync(int id)
        {
            return Ok(await _userProfileService.GetUserProfileByIdAsync(id));
        }
        [Route("userId/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetDistricByUserIdAsync(int id)
        {
            try
            {
                return Ok(await _userProfileService.GetDistricByUserIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateUserProfileAsync([FromBody]UserProfileModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _userProfileService.CreateUserProfileAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAsync(int id, [FromBody]UserProfileModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _userProfileService.UpdateUserProfileAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("imageurl/{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAvatarAsync(int id, [FromBody] PostRq data)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _userProfileService.UpdateUserProfileAvatarAsync(id, data.data, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DelteUserProfileAsync(int id)
        {
            try
            {
                return Ok(await _userProfileService.DeleteUserProfileAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("newcode")]
        [HttpGet]
        public async Task<IActionResult> AutoGenerateCodeAsync()
        {
            return OkValueObject(await _userProfileService.AutoGenerateCodeAsync());
        }

        [Route("checkcodeexists/{code}")]
        [HttpGet]
        public async Task<IActionResult> CheckCodeExists(string code)
        {
            return OkValueObject(await _userProfileService.CheckCodeExistsAsync(code));
        }
    }
}