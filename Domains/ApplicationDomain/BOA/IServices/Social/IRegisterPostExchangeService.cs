using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models.Social;
using ApplicationDomain.BOA.Models.Social.RegisterPostExchange;
using AspNetCore.Common.Identity;

namespace ApplicationDomain.BOA.IServices.Social
{
    public interface IRegisterPostExchangeService
    {
        Task<int> GetRegisterPostExchangeDoneByUserProfileIdAsync(int id);
        Task<IEnumerable<RegisterPostExchangeModel>> GetRegisterPostExchangesAsync();
        Task<RegisterPostExchangeModel> GetRegisterPostExchangeByIdAsync(int id);
        Task<IEnumerable<RegisterPostExchangeModel>> GetRegisterPostExchangeByPostIdAsync(int id);
        Task<int> CreateRegisterPostExchangeAsync(RegisterPostExchangeModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdateRegisterPostExchangeAsync(int id, RegisterPostExchangeModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteRegisterPostExchangeAsync(int id);
        Task<bool> AcceptRegisterPostExchangeByOwnerPostAsync(int id, int postExchange, UserIdentity<int> issuer);
        Task<IEnumerable<RegisterPostExchangeModel>> GetRegisterPostExchangeByUserProfileIdAsync(int id);
        Task<bool> AcceptRegisterPostExchangeByUserRegisterAsync(int id, UserIdentity<int> issuer);
        Task<bool> RejectRegisterPostExchangeByOwnerPostAsync(int id, MessageReject model, UserIdentity<int> issuer);
        Task<bool> RejectRegisterPostExchangeByUserRegisterAsync(int id, MessageReject model, UserIdentity<int> issuer);

    }
}
