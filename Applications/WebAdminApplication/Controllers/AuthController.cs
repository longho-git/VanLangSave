using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models.UserProfiles;
using ApplicationDomain.Helper;
using ApplicationDomain.Identity.IServices;
using ApplicationDomain.Identity.Models;
using ApplicationDomain.Identity.Models.Permissions;
using ApplicationDomain.Identity.Models.Users;
using AspNetCore.Common.Identity;
using AspNetCore.Mvc;
using AspNetCore.Mvc.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using WebAdminApplication.Models;

namespace WebAdminApplication.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IAuthService _authService;
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly IPermissionService _permissionService;
        private readonly IUserProfileService _userProfileService;
        public AuthController(
            IJwtTokenService jwtTokenService,
            IAuthService authService,
            IOptions<IdentityOptions> identityOptions,
            IPermissionService permissionService,
            IUserService userService,
            IUserProfileService userProfileService
            )
        {
            _jwtTokenService = jwtTokenService;
            _authService = authService;
            _identityOptions = identityOptions;
            _permissionService = permissionService;
            _userProfileService = userProfileService;
        }

       

        [Route("signin")]
        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody]SignInModelRq signInModelRq)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _authService.SignInAsync(signInModelRq.UserName, signInModelRq.Password, true);

            if (result.Succeeded)
            {
                var grantedPermission = await _permissionService.GetGrantedPermission(result.UserIdentity.Id, result.Roles.ToList());
                var additionClaims = new List<Claim> {new Claim("permission", JsonConvert.SerializeObject(grantedPermission))};
                var token = _jwtTokenService.GenerateToken(result.UserIdentity, result.Roles, additionClaims);
                var profile = await _userProfileService.GetDistricByUserIdAsync(result.UserIdentity.Id);
                var resultLogin = new LoginModel()
                {
                    Token = token,
                    UserProfile = profile,
                };
                return Ok(resultLogin);
            }

            if (result.IsLockedOut)
            {
                return BadRequest($"Tài khoản người dùng bị khóa, số lần truy cập không thành công tối đa là {_identityOptions.Value.Lockout.MaxFailedAccessAttempts}");
            }
            else if (result.IsNotAllowed)
            {
                return BadRequest("Tài khoản người dùng không được phép, hãy đảm bảo rằng tài khoản của bạn đã được xác minh");
            }
            else if (result.RequiresTwoFactor)
            {
                return BadRequest("Đăng nhập hai yếu tố là bắt buộc");
            }

            return BadRequest("Tên người dùng hoặc mật khẩu không đúng");
        }
        [Route("signinmsal")]
        [HttpPost]
        public async Task<IActionResult> GetSignInMsa([FromBody] EmailMSRq modelRq)
        {
            var host = new MailAddress(modelRq.Email).Host;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (host != EmailMSConstant.STUDENTMAIL && host != EmailMSConstant.LECTURERMAIL &&
                host != EmailMSConstant.LECTUREREDU)
                return BadRequest("Vui lòng dùng email Văn Lang!");
            return Ok(host);
        }

    }
}
