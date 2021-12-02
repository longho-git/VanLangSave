using ApplicationDomain.Core.Entities;

namespace ApplicationDomain.BOA.Entities.Social
{
    public class RegisterPostExchange: EntityBase<int>
    {
        public int StatusId { get; set; }
        public int? PostOwnerStatusId { get; set; }
        public int? UserRegisterStatusId { get; set; }
        public string RemarkUserRegisterReject { get; set; }
        public string RemarkPostOwnerReject { get; set; }
        public string Remark { get; set; }
        public int UserRegisterId { get; set; }
        public UserProfile UserRegister { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int? PostExchangeId { get; set; }
        public Post PostExchange { get; set; }
    }
}
