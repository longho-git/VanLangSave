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
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.AutoGenerate;

namespace WebAdminApplication.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IPermissionService _permissionService;
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly IUserProfileService _userProfileService;

        public UserController(
            IUserService userService,
             IJwtTokenService jwtTokenService,
             IPermissionService permissionService,
                   IOptions<IdentityOptions> identityOptions,
               IAuthService authService,
            IUserProfileService userProfileService
            )
        {
            _userService = userService;
            _authService = authService;
            _jwtTokenService = jwtTokenService;
            _permissionService = permissionService;
            _identityOptions = identityOptions;
            _userProfileService = userProfileService;

        }

        [Route("")]
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok( _userService.GetListUsers());
        }

        [Route("normal")]
        [HttpGet]
        public IActionResult GetNormalUsers()
        {
            return Ok(_userService.GetUsersNormalsAsync());
        }

        [Route("manager")]
        [HttpGet]
        public IActionResult GetManagerUsers()
        {
            return Ok(_userService.GetManagerUsersAsync());
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
            
                var host = new MailAddress(model.Email).Host;
                SignInModel result;
                if (host != EmailMSConstant.STUDENTMAIL && host != EmailMSConstant.LECTURERMAIL &&
                    host != EmailMSConstant.LECTUREREDU)
                    return BadRequest("Vui lòng dùng email Văn Lang!");
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = await _userService.FindByNameAsync(model.Email);
                if (user == null)
                {
                    try
                    {
                        var userCreate = await _userService.CreateUserAsync(model);
                        result = await _authService.SignInAsync(userCreate.UserName, AutoGenerate.OneWayEncryption(userCreate.UniqueId), true);
                    }
                    catch (Exception e)
                    {
                        return BadRequest("Đăng ký thất bại!!");
                    }
                }
                else
                {
                    if (user.UniqueId == null)
                    {
                     
                       var userChange =  await _userService.UpdateUserAsync(user.Id, model.UniqueId);
                        result = await _authService.SignInAsync(userChange.UserName,
                            AutoGenerate.OneWayEncryption(userChange.UniqueId), true);
                    }
                    else
                    {
                        result = await _authService.SignInAsync(user.UserName,
                            AutoGenerate.OneWayEncryption(user.UniqueId), true);

                    }
                }
                if (result.Succeeded)
                {
                    var grantedPermission =
                        await _permissionService.GetGrantedPermission(result.UserIdentity.Id,
                            result.Roles.ToList());
                    var additionClaims = new List<Claim>();
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
                    return BadRequest(
                        $"Tài khoản người dùng bị khóa, số lần truy cập không thành công tối đa là {_identityOptions.Value.Lockout.MaxFailedAccessAttempts}");
                }
                else if (result.IsNotAllowed)
                {
                    return BadRequest(
                        "Tài khoản người dùng không được phép, hãy đảm bảo rằng tài khoản của bạn đã được xác minh");
                }
                else if (result.RequiresTwoFactor)
                {
                    return BadRequest("Đăng nhập hai yếu tố là bắt buộc");
                }

                return BadRequest("Tên người dùng hoặc mật khẩu không đúng");
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
                if (ModelState.IsValid) return Ok(await _userService.CreateUserAsync(model));
                var modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                foreach (var error in ModelState.Values.SelectMany(entry => entry.Errors))
                    modelErrors.Add(error);
                return BadRequest(modelErrors);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("active/{userId}/{active}")]
        [HttpPut]
        public async Task<IActionResult> RegisterUserAsync(int userId,bool active)
        {
            try
            {
          
                return Ok(await _userService.ActiveUserAsync(userId,active));
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("manager/create")]
        [HttpPost]
        public async Task<IActionResult> CreateManagerUserAsync([FromBody] CreatedUserRq model)
        {
            try
            {
                if (ModelState.IsValid) return Ok(await _userService.CreateUserManagerAsync(model));
                var modelErrors = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelErrorCollection();
                foreach (var error in ModelState.Values.SelectMany(entry => entry.Errors))
                    modelErrors.Add(error);
                return BadRequest(modelErrors);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
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