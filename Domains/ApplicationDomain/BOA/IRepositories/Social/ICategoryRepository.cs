using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IRepositorie
{
    public interface ICategoryRepository : IGenericRepository<Category, int>
    {
        IQueryable GetCategories();
        IQueryable GetCategoryById(int id);


    }
}
