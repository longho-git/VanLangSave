using ApplicationDomain.Identity.Entities;
using AutoMapper;
using FluentValidation;
namespace ApplicationDomain.Identity.Models
{
    public class EmailMSRq
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string UniqueId { get; set; }
    }

    public class CEmailMSRqValidator : AbstractValidator<EmailMSRq>
    {
        public CEmailMSRqValidator()
        {
            RuleFor(p => p.Email).NotEmpty().EmailAddress();
            RuleFor(p => p.UserName).NotEmpty();
            RuleFor(p => p.UniqueId).NotEmpty();
            RuleFor(p => p.UniqueId).MinimumLength(10);
        }
    }
}
