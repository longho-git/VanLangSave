using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.RegisterPostGives;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IServices
{
    public interface IRegisterPostGiveService
    {
        Task<IEnumerable<RegisterPostGiveModel>> GetRegisterPostGivesAsync();
        Task<RegisterPostGiveModel> GetRegisterPostGiveByIdAsync(int id);
        Task<IEnumerable<RegisterPostGiveModel>> GetRegisterPostGiveByPostIdAsync(int id);
        Task<int> CreateRegisterPostGiveAsync(RegisterPostGiveModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdateRegisterPostGiveAsync(int id, RegisterPostGiveModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteRegisterPostGiveAsync(int id);
        Task<IEnumerable<RegisterPostGiveModel>> GetRegisterPostGiveByUserProfileIdAsync(int id);
        Task<bool> AcceptRegisterPostGiveAsync(int id, UserIdentity<int> issuer);
        Task<bool> RejectRegisterPostGiveAsync(int id, UserIdentity<int> issuer);

    }
}
