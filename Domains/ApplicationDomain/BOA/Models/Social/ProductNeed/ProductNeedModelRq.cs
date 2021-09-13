using ApplicationDomain.BOA.Entities;
using AutoMapper;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.ProductNeeds
{
    public class ProductNeedModelRq
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageURL { get; set; }
        public string Remark { get; set; }
        public int PostId { get; set; }
        public int CategroriesId { get; set; }
        public double expectedPrice { get; set; }
        public int expectedProduct { get; set; }
    }

    public class ProductNeedModelRqMapper : Profile
    {
        public ProductNeedModelRqMapper()
        {
            CreateMap<ProductNeedModelRq, ProductNeed>();
            var mapers = CreateMap<ProductNeed, ProductNeedModelRq>();
      
        }
    }
    public class ProductNeedModelRqValidator : AbstractValidator<ProductNeedModelRq>
    {
        public ProductNeedModelRqValidator()
        {
            RuleFor(p => p.Title).NotEmpty();
            RuleFor(p => p.Content).NotEmpty();
            RuleFor(p => p.PostId).NotEmpty();
        }
    }
}
