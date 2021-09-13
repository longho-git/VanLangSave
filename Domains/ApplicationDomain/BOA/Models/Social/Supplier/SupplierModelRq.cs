using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.Suppliers
{
    public class SupplierModelRq
    {
        public string Name { get; set; }
        public string address { get; set; }
        public string ImageURL { get; set; }
        public int typeSupplier { get; set; }
        public double evaluate { get; set; }
        public int UserId { get; set; }
    }

    public class SupplierModelRqMapper : Profile
    {
        public SupplierModelRqMapper()
        {
            CreateMap<SupplierModelRq, Supplier>();
            var mapers = CreateMap<Supplier, SupplierModelRq>();
      
        }
    }
}
