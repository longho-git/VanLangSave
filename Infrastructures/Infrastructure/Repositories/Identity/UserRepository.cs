﻿
using ApplicationDomain.Identity.Entities;
using ApplicationDomain.Identity.IRepositories;
using ApplicationDomain.Identity.Models;
using AspNetCore.UnitOfWork.EntityFramework;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.Helper;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories.Identity
{
    public class UserRepository : GenericRepository<User, int>, IUserRepository
    {
        private ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;
        public UserRepository(UserManager<User> userManager ,ApplicationDbContext dbContext) : base(dbContext)
        {
     
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<int> GetCountUserFromTo(DateTime fromDate, DateTime toDate)
        {
            var result = await dbSet.Where(r 
                => r.Status==true 
                   &&r.CreatedDate >= fromDate
                   && r.CreatedDate <= toDate
            ).ToListAsync();
            return result.Count;
        }
        public IQueryable GetUsers()
        {
            var query = (from user in _userManager.Users
                         select new UserModel { 
                             Id = user.Id,
                             Email = user.Email,
                             PhoneNumber = user.PhoneNumber,
                             Status = user.Status,
                             UserName = user.UserName,
                             CreatedByUserName = user.CreatedByUserName,
                             CreatedDate = user.CreatedDate,
                             UpdatedByUserName = user.UpdatedByUserName,
                             UpdatedDate = user.UpdatedDate,
                         }).Where(r=>r.UserName != "system");
            return query;
        }

        public string GetNetResetCodeByResetCode(string code)
        {
            var entity = dbSet.Where(r => r.ResetCode == code).FirstOrDefault();
            return entity != null ? entity.NetResetCode : string.Empty;
        }

        public async Task<User> GetUserByPhoneNumber(string phoneNumber)
        {
            var entity = await this.dbSet
                .Where(r => r.PhoneNumber == phoneNumber).FirstOrDefaultAsync();
            return entity ;
        }

        public IQueryable<User> GetSYSADMINUsers()
        {
            var managers = from uRole in _dbContext.UserRoles
                from user in _userManager.Users
                from role in _dbContext.Roles
                where role.Name == ROLE_CONSTANT.SYSADMIN && uRole.RoleId == role.Id && uRole.UserId == user.Id
                select new User()
                {
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName
                };
            return managers;
        } 
        public IQueryable GetUsersNormal()
        {
            var directors = from uRole in _dbContext.UserRoles
                from user in _userManager.Users
                from role in _dbContext.Roles
                where role.Name == ROLE_CONSTANT.NORMAL_USER && uRole.RoleId == role.Id && uRole.UserId == user.Id
               select new UserModel
            {
                Id = user.Id,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Status = user.Status,
                UserName = user.UserName,
                CreatedByUserName = user.CreatedByUserName,
                CreatedDate = user.CreatedDate,
                UpdatedByUserName = user.UpdatedByUserName,
                UpdatedDate = user.UpdatedDate,
            };
            return directors;
        }
        public IQueryable GetManagerUsers()
        {
            var employee = from uRole in _dbContext.UserRoles
                from user in _userManager.Users
                from role in _dbContext.Roles
                where role.Name == ROLE_CONSTANT.MANAGER && uRole.RoleId == role.Id && uRole.UserId == user.Id
                select new UserModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Status = user.Status,
                    UserName = user.UserName,
                    CreatedByUserName = user.CreatedByUserName,
                    CreatedDate = user.CreatedDate,
                    UpdatedByUserName = user.UpdatedByUserName,
                    UpdatedDate = user.UpdatedDate,
                };
            return employee;
        }


    }
}
