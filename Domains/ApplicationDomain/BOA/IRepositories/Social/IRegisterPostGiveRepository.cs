using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IRegisterPostGiveRepository : IGenericRepository<RegisterPostGive, int>
    {
        Task<int> CountRegisterPostGives(DateTime fromDate, DateTime toDate);
        IQueryable GetRegisterPostGives();
        IQueryable GetRegisterPostGiveById(int id);
        IQueryable GetRegisterPostGiveByPostId(int id);
        IQueryable GetRegisterPostGiveByUserProfileId(int id);
        IQueryable GetHistoryRegisterPostGiveByUserProfileId(int id);
        Task<int> CountRegisterPostGiveByUser(int userId, DateTime fromDate, DateTime toDate);
    }
}
