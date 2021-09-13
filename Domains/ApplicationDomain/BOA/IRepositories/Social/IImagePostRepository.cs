using ApplicationDomain.BOA.Entities;
using AspNetCore.UnitOfWork;
using System.Linq;

namespace ApplicationDomain.BOA.IRepositories
{
    public interface IImagePostRepository : IGenericRepository<ImagePost, int>
    {
        IQueryable GetImagePosts();
        IQueryable GetImagePostById(int id);
        IQueryable GetImagePostByPostId(int id);
    }
}
