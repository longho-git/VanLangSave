using System;
using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IPostRepository : IGenericRepository<Post, int>
    {
        IQueryable GetPostsWaiting();
        IQueryable GetPostById(int id);
        IQueryable GetPostByUserId(int id, int statusId);
        IQueryable GetPostsActive();
        IQueryable GetPostsCategoryId(int CategoryId);
        IQueryable GetPostActiveByUserId(int id);
        IQueryable GetPostByUserProfileId(int id);
        IQueryable SearchPostsActive(string searchTitle);
        IQueryable GetAllPostByUserId(int id);
        Task<int> GetPostCountFromTo(DateTime fromDate, DateTime toDate);
        Task<int> GetPostCountFromToByUserId(int userId, DateTime fromDate, DateTime toDate);
    }
}
