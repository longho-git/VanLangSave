using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.Categories
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public int Col { get; set; }
    }

    public class CategoryModelMapper : Profile
    {
        public CategoryModelMapper()
        {
            CreateMap<Category, CategoryModel>();
            var mapers = CreateMap<Category, CategoryModel>();
      
        }
    }
}
