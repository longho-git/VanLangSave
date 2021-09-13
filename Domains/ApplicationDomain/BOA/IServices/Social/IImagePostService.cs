using ApplicationDomain.BOA.Models;
using AspNetCore.Common.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationDomain.BOA.IServices
{
    public interface IImagePostService
    {
        Task<IEnumerable<ImagePostModel>> GetImagePostsAsync();
        Task<ImagePostModel> GetImagePostByIdAsync(int id);
        Task<IEnumerable<ImagePostModel>> GetImagePostByPostIdAsync(int id);
        Task<bool> UpdateImagePostAsync(int id, ImagePostModelRq model, UserIdentity<int> issuer);
        Task<bool> DeleteImagePostAsync(int id);
        Task<int> CreateImagePostAsync(ImagePostModelRq model, UserIdentity<int> issuer);


    }
}
