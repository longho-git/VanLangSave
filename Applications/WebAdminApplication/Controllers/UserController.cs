using ApplicationDomain.BOA.IServices;
using ApplicationDomain.Helper;
using ApplicationDomain.Identity.IServices;
using ApplicationDomain.Identity.Models;
using ApplicationDomain.Identity.Models.Permissions;
using AspNetCore.Mvc;
using AspNetCore.Mvc.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAdminApplication.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IPermissionService _permissionService;
        private readonly IOptions<IdentityOptions> _identityOptions;

        public UserController(
            IUserService userService,
             IJwtTokenService jwtTokenService,
             IPermissionService permissionService,
                   IOptions<IdentityOptions> identityOptions,
               IAuthService authService
            )
        {
            _userService = userService;
            _authService = authService;
            _jwtTokenService = jwtTokenService;
            _permissionService = permissionService;
            _identityOptions = identityOptions;

        }

        [Route("")]
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok( _userService.GetListUsers());
        }

        [Route("{id}")]
        [HttpGet]
        public async Task<IActionResult> GetUserById(int id)
        {
            try
            {
                return Ok(await _userService.GetUserById(id));

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("role")]
        [HttpGet]
        public async Task<IActionResult> GetRoleByUser()
        {
            var issuer = GetCurrentUserIdentity<int>();
            try
            {
                return Ok(await _userService.GetRoleByUser(issuer.Id));

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [Route("")]
        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody]CreatedUserRq model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                    foreach (var entry in ModelState.Values)
                        foreach (var error in entry.Errors)
                            modelErrors.Add(error);
                    return BadRequest(modelErrors);
                }
                if (await _userService.CreateUserAsync(model) > 0)
                {
                    var result = await _authService.SignInAsync(model.UserName, model.Password, true);
                    if (result.Succeeded)
                    {
                        GrantedPermission grantedPermission = await _permissionService.GetGrantedPermission(result.UserIdentity.Id, result.Roles.ToList());
                        List<Claim> additionClaims = new List<Claim>();
                        additionClaims.Add(new Claim("permission", JsonConvert.SerializeObject(grantedPermission)));
                        var token = _jwtTokenService.GenerateToken(result.UserIdentity, result.Roles, additionClaims);
                        return Ok(token);
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
                return BadRequest("Đăng ký thất bại!!");
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> RegisterUserAsync([FromBody] CreatedUserRq model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                    foreach (var entry in ModelState.Values)
                        foreach (var error in entry.Errors)
                            modelErrors.Add(error);
                    return BadRequest(modelErrors);
                }
                return Ok(await _userService.CreateUserAsync(model));
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpdateUserAsync(int id, [FromBody]UpdatedUserRq model)
        {
            if (!ModelState.IsValid)
            {
                Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                foreach (var entry in ModelState.Values)
                    foreach (var error in entry.Errors)
                        modelErrors.Add(error);
                return BadRequest(modelErrors);
            }
            var userId = await _userService.UpdateUserAsync(id, model, GetCurrentUserIdentity<int>());
            return OkValueObject(userId);
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(await _userService.DeleteUserAsync(id));
        }

        [Route("role")]
        [HttpPost]
        public async Task<IActionResult> AddRoleToUser([FromBody]UpdateUserRoleModelRq model)
        {
            if (!ModelState.IsValid)
            {
                Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                foreach (var entry in ModelState.Values)
                    foreach (var error in entry.Errors)
                        modelErrors.Add(error);
                return BadRequest(modelErrors);
            }
            return OkValueObject(await _userService.AddRoleToUserAsync(model));
        }

        [Route("addlistrole")]
        [HttpPost]
        public async Task<IActionResult> AddRolesToUser([FromBody]AddRolesToUserModelRq models)
        {
            if (!ModelState.IsValid)
            {
                Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                foreach (var entry in ModelState.Values)
                    foreach (var error in entry.Errors)
                        modelErrors.Add(error);
                return BadRequest(modelErrors);
            }
            return OkValueObject(await _userService.AddRolesToUser(models));
        }

        [Route("{userId}/{roleName}")]
        [HttpDelete]
        public async Task<IActionResult> RemoveRoleToUser(int userId, string roleName)
        {
            UpdateUserRoleModelRq model = new UpdateUserRoleModelRq()
            {
                UserId = userId,
                RoleName = roleName
            };
            return OkValueObject(await _userService.RemoveRoleToUserAsync(model));
        }

        [Route("emailchecking/{email}")]
        [HttpGet]
        public async Task<IActionResult> CheckEmailAsync(string email)
        {
            return OkValueObject(await _userService.CheckEmailAsync(email));
        }
    }
}