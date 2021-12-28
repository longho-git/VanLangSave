using ApplicationDomain.Identity.Entities;
using AutoMapper;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.Identity.Models
{
    public class UpdatedUserRq
    {
        public string UserName { get; set; }
 
        public string UniqueId { get; set; }
    }

    public class UpdatedUserRqMapper : Profile
    {
        public UpdatedUserRqMapper()
        {
            CreateMap<UpdatedUserRq, User>();
        }
    }

    public class UpdatedUserRqValidator : AbstractValidator<UpdatedUserRq>
    {
        public UpdatedUserRqValidator()
        {
           
        }
    }
}
