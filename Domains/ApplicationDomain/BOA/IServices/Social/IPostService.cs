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
        Task<IEnumerable<NewFeedModel>> GetAllPostOfUserIdAsync(int id);
        Task<IEnumerable<NewFeedModel>> SearchPostsActiveAsync(string search);
        Task<IEnumerable<NewFeedModel>> GetPostActiveOfUserIdAsync(int id);
        Task<IEnumerable<NewFeedModel>> GetPostsActiveAsync();
        Task<IEnumerable<NewFeedModel>> GetPostOfUserIdAsync(int id, int statusId);
        Task<IEnumerable<NewFeedModel>> GetPostsActiveAdminAsync();
        Task<PostModel> GetPostByIdAsync(int id);
        Task<IEnumerable<NewFeedModel>> GetPostByUserProfileIdAsync(int id);
        Task<int> CreatePostAsync(PostModelRq model, UserIdentity<int> issuer);
        Task<bool> UpdatePostAsync(int id, PostModelRq model, UserIdentity<int> issuer);
        Task<bool> DeletePostAsync(int id);
        Task<IEnumerable<NewFeedModel>> GetPostsWaitingAsync();
        Task<bool> ApprovePostAsync(int id, UserIdentity<int> issuer);
        Task<bool> RejectedPostAsync(int id, UserIdentity<int> issuer);
        Task<bool> HiddenPostAsync(int id, UserIdentity<int> issuer);
        Task<IEnumerable<NewFeedModel>> GetPostsByCategoryIdAsync(int CategoryId);
    }
}
