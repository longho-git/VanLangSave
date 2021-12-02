using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using ApplicationDomain.Helper;

namespace ApplicationDomain.BOA.Models.RegisterPostGives
{
    public class RegisterPostGiveModel
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public string Remark { get; set; }
        public int UserRegisterId { get; set; }
        public UserProfile UserRegister { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public string PostTitle { get; set; }
        public string StatusName
        {
            get
            {
                return RegisterPost.GetName(this.StatusId);
            }
        }
        public DateTimeOffset CreatedDate { get; set; }
    }

    public class RegisterPostGiveModelMapper : Profile
    {
        public RegisterPostGiveModelMapper()
        {
            CreateMap<RegisterPostGive, RegisterPostGiveModel>();
            var mapers = CreateMap<RegisterPostGive, RegisterPostGiveModel>();
      
        }
    }
}
