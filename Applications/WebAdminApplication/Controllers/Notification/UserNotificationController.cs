using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.IServices.Notification;
using ApplicationDomain.BOA.Models;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class UserNotificationController : BaseController
    {
        private readonly IUserNotificationService _userNotificationService;
        public UserNotificationController(IUserNotificationService userNotificationService)
        {
            _userNotificationService = userNotificationService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetUserNotificationsAsync()
        {
            return Ok(await _userNotificationService.GetUserNotificationsAsync());
        }

     

        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetUserNotificationById(int id)
        {
            return Ok(await _userNotificationService.GetUserNotificationByIdAsync(id));
        }

        [Route("userProfile/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetUserNotificationByUserProfileId(int id)
        {
            return Ok(await _userNotificationService.GetUserNotificationByUserProfileIdAsync(id));
        }
        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateUserNotificationAsync([FromBody]UserNotificationModelRq model)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                foreach (var error in ModelState.Values.SelectMany(entry => entry.Errors))
                    modelErrors.Add(error);
                return BadRequest(modelErrors);
            }
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _userNotificationService.CreateUserNotificationAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUserNotificationAsync(int id)
        {
            try
            {
                await _userNotificationService.DeleteUserNotificationAsync(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Route("{id:int}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserNotificationAsync(int id, [FromBody]UserNotificationModelRq model)
        {
            if (!ModelState.IsValid)
            {
                var modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                foreach (var error in ModelState.Values.SelectMany(entry => entry.Errors))
                    modelErrors.Add(error);
                return BadRequest(modelErrors);
            }
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _userNotificationService.UpdateUserNotificationAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}