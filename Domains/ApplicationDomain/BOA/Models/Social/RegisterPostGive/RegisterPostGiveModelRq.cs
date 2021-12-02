using ApplicationDomain.BOA.Entities;
using AutoMapper;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.RegisterPostGives
{
    public class RegisterPostGiveModelRq
    {
        public int StatusId { get; set; }
        public string Remark { get; set; }
        public int UserRegisterId { get; set; }
        public int PostId { get; set; }
    }

    public class RegisterPostGiveModelRqMapper : Profile
    {
        public RegisterPostGiveModelRqMapper()
        {
            CreateMap<RegisterPostGiveModelRq, RegisterPostGive>();
            var mapers = CreateMap<RegisterPostGive, RegisterPostGiveModelRq>();
      
        }
    }
    public class RegisterPostGiveModelRqValidator : AbstractValidator<RegisterPostGiveModelRq>
    {
        public RegisterPostGiveModelRqValidator()
        {
            RuleFor(p => p.UserRegisterId).NotEmpty();
            RuleFor(p => p.PostId).NotEmpty();
        }
    }
}
