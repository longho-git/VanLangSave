using ApplicationDomain.Identity.Entities;
using AutoMapper;
using FluentValidation;
using System;

namespace ApplicationDomain.Identity.Models
{
    public class CreatedUserRq
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public bool Status { get; set; }
        public DateTime BirthDay { get; set; }
        public string ImageURL { get; set; }
    }

    public class CreatedUserRqMapper : Profile
    {
        public CreatedUserRqMapper()
        {
            CreateMap<CreatedUserRq, User>();
        }
    }

    public class CreatedUserRqValidator : AbstractValidator<CreatedUserRq>
    {
        public CreatedUserRqValidator()
        {
            
            RuleFor(p => p.Email).NotEmpty().EmailAddress();
        }
    }
}
