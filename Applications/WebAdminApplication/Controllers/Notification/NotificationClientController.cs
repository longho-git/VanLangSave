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
    public class NotificationClientController : BaseController
    {
        private readonly INotificationClientService _notificationClientService;
        public NotificationClientController(INotificationClientService notificationClientService)
        {
            _notificationClientService = notificationClientService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetNotificationClientsAsync()
        {
            return Ok(await _notificationClientService.GetNotificationClientsAsync());
        }

     

        [Route("{id:int}")]
        [HttpGet]
        public async Task<IActionResult> GetNotificationClientById(int id)
        {
            return Ok(await _notificationClientService.GetNotificationClientByIdAsync(id));
        }

        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateNotificationClientAsync([FromBody]NotificationClientModelRq model)
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
                return Ok(await _notificationClientService.CreateNotificationAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("{id:int}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteNotificationClientAsync(int id)
        {
            try
            {
                await _notificationClientService.DeleteNotificationClientAsync(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Route("{id:int}")]
        [HttpPut]
        public async Task<IActionResult> UpdateNotificationClientAsync(int id, [FromBody]NotificationClientModelRq model)
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
                return Ok(await _notificationClientService.UpdateNotificationClientAsync(id, model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}