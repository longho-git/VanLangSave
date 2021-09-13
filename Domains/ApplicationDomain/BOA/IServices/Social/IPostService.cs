using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Posts;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IServices
{
    public interface IPostService
    {
        Task<IEnumerable<NewFeedModel>> GetPostsActiveAsync();
        Task<PostModel> GetPostByIdAsync(int id);
        Task<IEnumerable<PostModel>> GetPostByUserIdAsync(int id);
        Task<int> CreatePostAsync(PostModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdatePostAsync(int id, PostModelRq model, UserIdentity<int> issuer);
        Task<bool> DeletePostAsync(int id);
        Task<IEnumerable<NewFeedModel>> GetPostOfUserIdAsync(int id);
        Task<IEnumerable<NewFeedModel>> GetPostsAsync();
        Task<bool> ActivePostAsync(int id,int active, UserIdentity<int> issuer);
    }
}
