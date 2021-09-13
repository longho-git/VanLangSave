using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCore.Mvc;
using ApplicationDomain.Core.IServices;
using ApplicationDomain.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers
{
    public class EmailTemplateController : BaseController
    {
        private readonly IEmailService _emailService;
        public EmailTemplateController(IEmailService EmailService)
        {
            _emailService = EmailService;
        }

        [Route("")]
        [HttpGet]
        public IActionResult GetEmailTemplate()
        {
            return Ok(_emailService.GetEmailTemplate());
        }

        [Route("")]
        [HttpPost]
        public IActionResult CreateEmailTemplate([FromBody] EmailTemplateCreateModel model)
        {
            try
            {
                return Ok(_emailService.CreateEmailTemplate(model));
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("default")]
        [HttpPost]
        public async Task<IActionResult> CreateDefaultEmailTemplate()
        {
            try
            {
                return Ok(await _emailService.CreateDefaultEmailTemplate());
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}