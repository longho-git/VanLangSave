using System;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.IServices.Social;
using ApplicationDomain.BOA.Models.Social;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace WebAdminApplication.Controllers.Social
{
    public class HistoryRegisterPostController : BaseController
    {
        private readonly IHistoryRegisterPostService _historyRegisterPostService;
        public HistoryRegisterPostController(IHistoryRegisterPostService historyRegisterPostService)
        {
            _historyRegisterPostService = historyRegisterPostService;
        }

        [Route("")]
        [HttpGet]
        public async Task<IActionResult> GetHistoryRegisterAsyncs()
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _historyRegisterPostService.GetHistoryRegisterPostAsync(issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("manager")]
        [HttpGet]
        public async Task<IActionResult> GetHistoryRegisterAllAsyncs()
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _historyRegisterPostService.GetHistoryRegisterPostAllAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("statics/{fromDate}/{toDate}")]
        [HttpGet]
        public async Task<IActionResult> GetStaticsticAsyncs(DateTime fromDate, DateTime toDate)
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _historyRegisterPostService.GetStaticstic(fromDate, toDate));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}