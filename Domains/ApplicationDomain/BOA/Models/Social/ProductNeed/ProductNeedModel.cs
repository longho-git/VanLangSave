using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.ProductNeeds
{
    public class ProductNeedModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageURL { get; set; }
        public string Remark { get; set; }
        public int PostId { get; set; }
        public int CategroriesId { get; set; }
        public double expectedPrice { get; set; }
        public int expectedProduct { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }

    public class ProductNeedModelMapper : Profile
    {
        public ProductNeedModelMapper()
        {
            CreateMap<ProductNeed, ProductNeedModel>();
            var mapers = CreateMap<ProductNeed, ProductNeedModel>();
      
        }
    }
}
