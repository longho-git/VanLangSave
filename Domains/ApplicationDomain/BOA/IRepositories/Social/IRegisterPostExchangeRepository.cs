using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities.Social;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IRegisterPostExchangeRepository : IGenericRepository<RegisterPostExchange, int>
    {
        IQueryable GetRegisterPostExchanges();
        IQueryable GetRegisterPostExchangeById(int id);
        IQueryable GetRegisterPostExchangeByPostId(int id);
        IQueryable GetRegisterPostExchangeByUserProfileId(int id);
        IQueryable GetHistoryRegisterPostExchangeByUserProfileId(int id);
        IQueryable GetRegisterPostExchangeDoneByUserProfileId(int id);
        Task<int> CountRegisterPostExchanges(DateTime fromDate, DateTime toDate);
        Task<int> CountRegisterPostExchangesByUser(int userId, DateTime fromDate, DateTime toDate);
    }
}
