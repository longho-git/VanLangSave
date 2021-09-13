using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.SupplierSuggests
{
    public class SupplierSuggestModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Status { get; set; }
        public decimal Price { get; set; }
        public int ProductNeedId { get; set; }
        public string ProductNeedTitle { get; set; }
        public string SupplierName { get; set; }
    
    }

    public class SupplierSuggestModelMapper : Profile
    {
        public SupplierSuggestModelMapper()
        {
            CreateMap<SupplierSuggest, SupplierSuggestModel>();
            var mapers = CreateMap<SupplierSuggest, SupplierSuggestModel>();
      
        }
    }
}
