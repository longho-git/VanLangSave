using System;
using ApplicationDomain.BOA.Entities;
using ApplicationDomain.Helper;
using AutoMapper;

namespace ApplicationDomain.BOA.Models.Social.RegisterPostExchange
{
    public class RegisterPostExchangeModel
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public string Remark { get; set; }
        public int UserRegisterId { get; set; }
        public string StatusName
        {
            get
            {
                return RegisterPostStatus.GetName(this.StatusId);
            }
        }
        public int? PostOwnerStatusId { get; set; }
        public int? UserRegisterStatusId { get; set; }
        public string RemarkUserRegisterReject { get; set; }
        public string RemarkPostOwnerReject { get; set; }
        public int PostId { get; set; }
        public string PostTitle { get; set; }
        public int PostStatuts { get; set; }
        public UserProfile UserRegister { get; set; }
        public Post Post { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public int? PostExchangeId { get; set; }
        public Post PostExchange { get; set; }

    }

    public class RegisterPostExchangeModelMapper : Profile
    {
        public RegisterPostExchangeModelMapper()
        {
            CreateMap<Entities.Social.RegisterPostExchange, RegisterPostExchangeModel>();
            var mapers = CreateMap<Entities.Social.RegisterPostExchange, RegisterPostExchangeModel>();
      
        }
    }
}
