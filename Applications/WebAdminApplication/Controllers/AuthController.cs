using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models.UserProfiles;
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
                GrantedPermission grantedPermission = await _permissionService.GetGrantedPermission(result.UserIdentity.Id, result.Roles.ToList());
                List<Claim> additionClaims = new List<Claim>();
                additionClaims.Add(new Claim("permission", JsonConvert.SerializeObject(grantedPermission)));
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

        [Route("forgotpassword")]
        [HttpPost]
        public async Task<IActionResult> ForgotPasswordAsync([FromBody]UserForgotPasswordRq model)
        {
            try
          {
                return Ok(await _authService.ForgotPasswordAsync(model));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("tltquotation")]
        [HttpPost]
        public async Task<IActionResult> TLTQuotationAsync([FromBody]TLTQuotationRq model)
        {
            try
            {
                var issuer = GetCurrentUserIdentity<int>();
                return Ok(await _authService.TLTQuotationAsync(model, issuer));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("mobile/resetpassword")]
        [HttpPut]
        public async Task<IActionResult> ResetPasswordAsync([FromBody]ResetPasswordRq model)
        {
            try
            {
                return Ok(await _authService.ChangePasswordMobileAsync(model));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("mobile/resetpassword/phonenumber")]
        [HttpPut]
        public async Task<IActionResult> ResetPasswordByPhoneNumberAsync([FromBody] ResetPasswordRq model)
        {
            try
            {
                return Ok(await _authService.ChangePasswordMobileByPhoneAsync(model));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("resetpassword")]
        [HttpPut]
        public async Task<IActionResult> ResetPasswordWebAsync([FromBody] ResetPasswordRq model)
        {
            try
            {
                return Ok(await _authService.ResetPasswordAsync(model));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("checkpassword")]
        [HttpPost]
        public async Task<IActionResult> CheckUserPassword([FromBody]UserCheckPasswordRq model)
        {
            try
            {
                UserIdentity<int> issuer = null;
                issuer = GetCurrentUserIdentity<int>(); var checkPassword = await _authService.CheckExistUserPasswordAsync(issuer.Id, model);
                if (!checkPassword)
                {
                    return BadRequest("Wrong Password");
                }
                return Ok(checkPassword);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("changepassword")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody]UserChangePasswordRq model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                try
                {
                    UserIdentity<int> issuer = null;
                    issuer = GetCurrentUserIdentity<int>();
                    return Ok(await _authService.ChangePasswordAsync(model, issuer));
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }
            }
        }
        [Route("emailchecking/{email}")]
        [HttpGet]
        public async Task<IActionResult> CheckEmailAsync(string email)
        {
            return OkValueObject(await _authService.CheckEmailAsync(email));
        }
        [Route("phonechecking/{phone}")]
        [HttpGet]
        public async Task<IActionResult> CheckPhoneNumberAsync(string phone)
        {
            return OkValueObject(await _authService.CheckPhoneNumberAsync(phone));
        }

    }
}
