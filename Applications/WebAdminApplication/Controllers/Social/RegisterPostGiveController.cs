using System;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models.RegisterPostGives;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers.Social 
{
    public class RegisterPostGiveController : BaseController
    {
        private readonly IRegisterPostGiveService _registerPostGiveService;
        public RegisterPostGiveController(IRegisterPostGiveService registerPostGiveService)
        {
            _registerPostGiveService = registerPostGiveService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetUserProfileAsyncs()
        {
            return Ok(await _registerPostGiveService.GetRegisterPostGivesAsync());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetRegisterPostGiveByIdAsync(int id)
        {
            return Ok(await _registerPostGiveService.GetRegisterPostGiveByIdAsync(id));
        }
        [Route("PostId/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetRegisterPostGiveByPostIdAsync(int id)
        {
            try
            {
                return Ok(await _registerPostGiveService.GetRegisterPostGiveByPostIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("UserRegisterId/{id}")]
        [HttpGet]
        public async Task<IActionResult> GetRegisterPostGiveByUserRegisterIdAsync(int id)
        {
            try
            {
                return Ok(await _registerPostGiveService.GetRegisterPostGiveByUserProfileIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateUserProfileAsync([FromBody]RegisterPostGiveModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostGiveService.CreateRegisterPostGiveAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAsync(int id, [FromBody] RegisterPostGiveModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostGiveService.UpdateRegisterPostGiveAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("accept/{id}")]
        [HttpPut]
        public async Task<IActionResult> AcceptRegisterPostGiveAsync(int id)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostGiveService.AcceptRegisterPostGiveAsync(id, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("reject/{id}")]
        [HttpPut]
        public async Task<IActionResult> RejectRegisterPostGiveAsync(int id)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostGiveService.RejectRegisterPostGiveAsync(id, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRegisterPostGiveAsync(int id)
        {
            try
            {
                return Ok(await _registerPostGiveService.DeleteRegisterPostGiveAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}