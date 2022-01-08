using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models.Social;
using ApplicationDomain.BOA.Models.Social.RegisterPostExchange;

namespace ApplicationDomain.BOA.IServices
{
    public interface IHistoryRegisterPostService
    {
        Task<List<HistoryRegisterPostModel>> GetHistoryRegisterPostAsync(UserIdentity<int> issuer);
        Task<List<HistoryRegisterPostModel>> GetHistoryRegisterPostAllAsync();
        Task<StaticsticModel> GetStaticstic(DateTime fromDate, DateTime toDate);
    }
}
