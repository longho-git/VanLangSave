using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System.Linq;

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
    }
}
