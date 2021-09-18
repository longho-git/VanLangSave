using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System.Linq;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IPostRepository : IGenericRepository<Post, int>
    {
        IQueryable GetPosts();
        IQueryable GetPostById(int id);
        IQueryable GetPostByUserId(int id);
        IQueryable GetPostsActive();
        IQueryable GetPostsCategoryId(int CategoryId);
    }
}
