using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.SupplierSuggests
{
    public class SupplierSuggestModelRq
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public decimal Price { get; set; }
        public int ProductNeedId { get; set; }
        public int SupplierId { get; set; }
    }

    public class SupplierSuggestModelRqMapper : Profile
    {
        public SupplierSuggestModelRqMapper()
        {
            CreateMap<SupplierSuggestModelRq, SupplierSuggest>();
            var mapers = CreateMap<SupplierSuggest, SupplierSuggestModelRq>();
      
        }
    }
}
