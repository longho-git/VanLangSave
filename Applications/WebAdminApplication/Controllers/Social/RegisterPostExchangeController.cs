using System;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.IServices.Social;
using ApplicationDomain.BOA.Models.Social;
using ApplicationDomain.BOA.Models.Social.RegisterPostExchange;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers.Social
{
    public class RegisterPostExchangeController : BaseController
    {
        private readonly IRegisterPostExchangeService _registerPostExchangeService;
        public RegisterPostExchangeController(IRegisterPostExchangeService registerPostExchangeService)
        {
            _registerPostExchangeService = registerPostExchangeService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetUserProfileAsyncs()
        {
            return Ok(await _registerPostExchangeService.GetRegisterPostExchangesAsync());
        }

        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetRegisterPostExchangeByIdAsync(int id)
        {
            return Ok(await _registerPostExchangeService.GetRegisterPostExchangeByIdAsync(id));
        }
        [Route("PostId/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetRegisterPostExchangeByPostIdAsync(int id)
        {
            try
            {
                return Ok(await _registerPostExchangeService.GetRegisterPostExchangeByPostIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateUserProfileAsync([FromBody]RegisterPostExchangeModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostExchangeService.CreateRegisterPostExchangeAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id:int}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserProfileAsync(int id, [FromBody] RegisterPostExchangeModelRq model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostExchangeService.UpdateRegisterPostExchangeAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRegisterPostExchangeAsync(int id)
        {
            try
            {
                return Ok(await _registerPostExchangeService.DeleteRegisterPostExchangeAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("owner/accept/{id:int}/{postExchange:int}")]
        [HttpPut]
        public async Task<IActionResult> AcceptRegisterPostExchangeByOwnerPostAsync(int id, int postExchange)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostExchangeService.AcceptRegisterPostExchangeByOwnerPostAsync(id, postExchange, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("userRegister/accept/{id:int}")]
        [HttpPut]
        public async Task<IActionResult> AcceptRegisterPostExchangeByUserRegisterAsync(int id)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostExchangeService.AcceptRegisterPostExchangeByUserRegisterAsync(id, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("done/UserRegisterId/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetRegisterPostExchangeDoneByUserProfileIdAsync(int id)
        {
            try
            {
                return Ok(await _registerPostExchangeService.GetRegisterPostExchangeDoneByUserProfileIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        [Route("UserRegisterId/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetRegisterPostExchangeByUserRegisterIdAsync(int id)
        {
            try
            {
                return Ok(await _registerPostExchangeService.GetRegisterPostExchangeByUserProfileIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("owner/reject/{id}")]
        [HttpPut]
        public async Task<IActionResult> RejectRegisterPostExchangeByOwnerAsync(int id,[FromBody] MessageReject model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostExchangeService.RejectRegisterPostExchangeByOwnerPostAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("userRegister/reject/{id}")]
        [HttpPut]
        public async Task<IActionResult> RejectRegisterPostExchangeByUserRegisterAsync(int id, [FromBody] MessageReject model)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _registerPostExchangeService.RejectRegisterPostExchangeByUserRegisterAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

    }
}