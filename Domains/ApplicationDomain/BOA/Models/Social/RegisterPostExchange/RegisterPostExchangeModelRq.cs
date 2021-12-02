using AutoMapper;
using FluentValidation;

namespace ApplicationDomain.BOA.Models.Social.RegisterPostExchange
{
    public class RegisterPostExchangeModelRq
    {
        public int StatusId { get; set; }
        public string Remark { get; set; }
        public int UserRegisterId { get; set; }
        public int PostId { get; set; }
    }

    public class RegisterPostExchangeModelRqMapper : Profile
    {
        public RegisterPostExchangeModelRqMapper()
        {
            CreateMap<RegisterPostExchangeModelRq, Entities.Social.RegisterPostExchange>();
            var mapers = CreateMap<Entities.Social.RegisterPostExchange, RegisterPostExchangeModelRq>();
      
        }
    }
    public class RegisterPostExchangeModelRqValidator : AbstractValidator<RegisterPostExchangeModelRq>
    {
        public RegisterPostExchangeModelRqValidator()
        {
            RuleFor(p => p.UserRegisterId).NotEmpty();
            RuleFor(p => p.PostId).NotEmpty();
        }
    }
}
