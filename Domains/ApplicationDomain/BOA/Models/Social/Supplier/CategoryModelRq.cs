using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.Categories
{
    public class CategoryModelRq
    {
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public int Col { get; set; }
    }

    public class CategoryModelRqMapper : Profile
    {
        public CategoryModelRqMapper()
        {
            CreateMap<CategoryModelRq, Category>();
            var mapers = CreateMap<Category, CategoryModelRq>();
      
        }
    }
}
