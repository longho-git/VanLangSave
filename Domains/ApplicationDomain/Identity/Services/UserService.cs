
using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.Core.Entities;
using ApplicationDomain.Core.IRepositories;
using ApplicationDomain.Helper;
using ApplicationDomain.Identity.Entities;
using ApplicationDomain.Identity.IRepositories;
using ApplicationDomain.Identity.IServices;
using ApplicationDomain.Identity.Models;
using AspNetCore.AutoGenerate;
using AspNetCore.Common.Exceptions;
using AspNetCore.Common.Identity;
using AspNetCore.Common.Messages;
using AspNetCore.EmailSender;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IServices;

namespace ApplicationDomain.Identity.Services
{
    public class UserService : ServiceBase, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly UserManager<User> _userManagement;
        private readonly IEmailSender _emailSender;
        private readonly IEmailRepository _emailTemplateRepository;
        private readonly IPostService _postService;
        private readonly IPostRepository _postRepository;
        public UserService(
            IMapper mapper,
            IUnitOfWork uow,
            IUserRepository userRepository,
            IUserProfileRepository userProfileRepository,
            IRoleRepository roleRepository,
            UserManager<User> userManagement,
            IEmailSender emailSender,
            RoleManager<Role> roleManager,
            IEmailRepository emailTemplateRepository,
            IPostService postService,
            IPostRepository postRepository
            ) : base(mapper, uow)
        {
            _userRepository = userRepository;
            _userProfileRepository = userProfileRepository;
            _userManagement = userManagement;
            _emailSender = emailSender;
            _emailTemplateRepository = emailTemplateRepository;
            _postService = postService;
            _postRepository = postRepository;
        }

        public IEnumerable<UserModel> GetListUsers()
        {
            try
            {
                return _userRepository.GetUsers().Cast<UserModel>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IList<string>> GetRoleByUser(int userId)
        {
            try
            {
                var identity = await _userManagement.FindByIdAsync(userId.ToString());
                var user = await _userManagement.GetRolesAsync(identity);
                return user;
            }
            catch (Exception e )
            {
                Console.WriteLine(e );
                throw;
            }
        }

        public async Task<IList<string>> GetRoleByUser(User user)
        {
            try
            {
                var roles = await _userManagement.GetRolesAsync(user);
                return roles;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<UserModel> GetUserById(int id)
        {
            var user = await _userManagement.FindByIdAsync(id.ToString());
            var result = _mapper.Map<UserModel>(user);
            return result;
        }

        public async Task<User> CreateUserAsync(CreatedUserRq model, UserIdentity<int> issuer = null)
        {
            try
            {
                model.Status = true;
                model.UserName = model.Email;
                var user = _mapper.Map<User>(model);
                if (issuer != null)
                {
                    user.CreateBy(issuer).UpdateBy(issuer);
                }
                var password = AutoGenerate.OneWayEncryption(model.UniqueId);
                var identityResult = await _userManagement.CreateAsync(user, password);

                if (!identityResult.Succeeded)
                {
                    throw CreateException(identityResult.Errors);
                }

                await _userManagement.AddToRoleAsync(user, ROLE_CONSTANT.NORMAL_USER);
             

                var userProfileEntity = new UserProfile()
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    CreatedByUserId = user.Id,
                    UserId = user.Id,
                    CreatedByUserName = user.UserName,
                    BirthDay= model.BirthDay,
                    CreatedDate = DateTimeOffset.Now,
                    Email= model.Email,
                    AvatarURL = "https://www.dropbox.com/s/qinze1b6wxs2mu3/rerts1zk.gfo.png?dl=1",
                };

                _userProfileRepository.Create(userProfileEntity);
                await _uow.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> CreateUserManagerAsync(CreatedUserRq model, UserIdentity<int> issuer = null)
        {
            try
            {
                model.Status = true;
                model.UserName = model.Email;
                var user = _mapper.Map<User>(model);
                if (issuer != null)
                {
                    user.CreateBy(issuer).UpdateBy(issuer);
                }
                var generatePassword= AutoGenerate.AutoGeneratePassword(8, true, true);
                var password = generatePassword;
                var identityResult = await _userManagement.CreateAsync(user, password);

                if (!identityResult.Succeeded)
                {
                    throw CreateException(identityResult.Errors);
                }

                await _userManagement.AddToRoleAsync(user, ROLE_CONSTANT.MANAGER);


                var userProfileEntity = new UserProfile()
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    CreatedByUserId = user.Id,
                    UserId = user.Id,
                    CreatedByUserName = user.UserName,
                    BirthDay = model.BirthDay,
                    CreatedDate = DateTimeOffset.Now,
                    AvatarURL = "https://www.dropbox.com/s/qinze1b6wxs2mu3/rerts1zk.gfo.png?dl=1",
                };

                _userProfileRepository.Create(userProfileEntity);
                if (await _uow.SaveChangesAsync() <= 0) return 0;
                var emailTemplate =
                    await _emailTemplateRepository.GetEmailTemplateByNameAsync("NewUserEmail");
                emailTemplate.EmailContent = emailTemplate.EmailContent.Replace("#email", model.Email);
                emailTemplate.EmailContent = emailTemplate.EmailContent.Replace("#username", model.Email);
                emailTemplate.EmailContent = emailTemplate.EmailContent.Replace("#password", password);
                try
                {
                    await _emailSender.SendEmailAsync(model.Email, emailTemplate.EmailSubject,
                        emailTemplate.EmailContent, true);
                }
                catch (Exception e)
                {
                    throw e;
                }
                return user.Id;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> FindByNameAsync(string userName)
        {
            var user = await _userManagement.FindByNameAsync(userName);
            if (user == null) return null;
            return user;
        }

        private Exception CreateException(IEnumerable<IdentityError> errors)
        {
            var exception = new UserDefinedException();
            exception.UserDefinedMessage = new ExceptionMessage();
            exception.UserDefinedMessage.Details = new List<ExceptionMessage>();

            foreach (var error in errors)
            {
                exception.UserDefinedMessage.Details.Add(new ExceptionMessage
                {
                    Message = error.Description
                });
            }
            exception.UserDefinedMessage.Message = exception.UserDefinedMessage.Details.First().Message;

            return exception;
        }
        public async Task<User> ChangePass(int id, string uniqueId)
        {
            var user = await _userManagement.FindByIdAsync(id.ToString());
            var token = await _userManagement.GeneratePasswordResetTokenAsync(user);
            await _userManagement.ResetPasswordAsync(user, token, uniqueId);
            await _uow.SaveChangesAsync();
            return user;
        }
        public async Task<User> UpdateUserAsync(int id, string uniqueId)
        {
            var user = await _userManagement.FindByIdAsync(id.ToString());
            user.UniqueId = uniqueId;
            await _userManagement.UpdateAsync(user);
            var token = await _userManagement.GeneratePasswordResetTokenAsync(user);
            await _userManagement.ResetPasswordAsync(user,token, uniqueId);
            await _uow.SaveChangesAsync();
            return user;
        }
        public async Task<User> ActiveUserAsync(int id, bool active)
        {
            var user = await _userManagement.FindByIdAsync(id.ToString());
            user.Status = active;
            if (active == false)
            {
                var posts = await _postService.GetAllPostOfUserIdAsync(id);
                foreach (var item in posts)
                {
                    if (item.Active == true)
                    {
                        var post = await _postRepository.GetEntityByIdAsync(item.Id);
                        post.Active = false;
                        _postRepository.Update(post);
                        await _uow.SaveChangesAsync();
                    }
                }
            }
            await _userManagement.UpdateAsync(user);
            await _uow.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userManagement.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return false;
            }
            _userRepository.Delete(user);

            await _uow.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AddRoleToUserAsync(UpdateUserRoleModelRq model)
        {
            try
            {
                var user = await _userManagement.FindByIdAsync(model.UserId.ToString());
                if (user == null)
                {
                    return false;
                }
                var rs = await _userManagement.AddToRoleAsync(user, model.RoleName);
                if (rs.Succeeded)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> RemoveRoleToUserAsync(UpdateUserRoleModelRq model)
        {
            try
            {
                var user = await _userManagement.FindByIdAsync(model.UserId.ToString());
                if (user == null)
                {
                    return false;
                }
                var roles = await _userManagement.GetRolesAsync(user);
                if (roles.Count > 1)
                {
                    var rs = await _userManagement.RemoveFromRoleAsync(user, model.RoleName);
                    if (rs.Succeeded)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> CheckEmailAsync(string email)
        {
            try
            {
                var user = await _userManagement.FindByEmailAsync(email);
                return user != null;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> AddRolesToUser(AddRolesToUserModelRq model)
        {
            try
            {
                var user = await _userManagement.FindByIdAsync(model.UserId.ToString());
                if (user == null)
                {
                    return false;
                }
                foreach (var item in model.Roles)
                {
                    var rs = await _userManagement.AddToRoleAsync(user, item.Name);
                    if (!rs.Succeeded)
                    {
                        return false;
                    }
                }
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public IEnumerable<UserModel> GetUsersNormalsAsync()
        {
            try
            {
                return  _userRepository.GetUsersNormal().Cast<UserModel>();
            }
            catch (Exception e)
            {
                throw e;
            }
        } 
        public IEnumerable<UserModel> GetManagerUsersAsync()
        {
            try
            {
                return  _userRepository.GetManagerUsers().Cast<UserModel>();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<int> CreateUserRegistrationAsync([FromBody]CreatedUserRq model)
        {
            try
            {
                var entity = new User()
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber
                };

                var rs = await _userManagement.AddToRoleAsync(entity, model.Role);
                return entity.Id;
            }
            catch (Exception e)
            {
                throw e;
            }

        }
    }
}
