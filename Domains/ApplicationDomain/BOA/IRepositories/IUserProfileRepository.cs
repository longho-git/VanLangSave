using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IUserProfileRepository : IGenericRepository<UserProfile, int>
    {
        IQueryable GetUserProfiles();
        IQueryable GetUserProfileById(int id);
        IQueryable GetDistricByUserId(int id);
        Task<bool> CheckCodeExistsAsync(string code);
    }
}
