using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models.Posts;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.Helper;
using ApplicationDomain.BOA.Models.UserProfiles;

namespace ApplicationDomain.BOA.Services
{
    public class PostService : ServiceBase, IPostService
    {
        private readonly IPostRepository _PostRepository;
        private readonly IImagePostService _imagePostService;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IImagePostRepository _imagePostRepository;
        public PostService(
            IPostRepository PostRepository,
            IImagePostService imagePostService,
            IImagePostRepository imagePostRepository,
            IUserProfileRepository userProfileRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _PostRepository = PostRepository;
            _imagePostService = imagePostService;
            _imagePostRepository = imagePostRepository;
            _userProfileRepository = userProfileRepository;
;
        }

        public async Task<IEnumerable<NewFeedModel>> GetPostsActiveAsync()
        {
            var postList = await _PostRepository.GetPostsActive().MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images)
                    {
                        if (image.MainPost == true)
                        {
                            item.ImageMain = image.src;
                        }
                    }
                }
                else
                {
                    item.ImageMain = null;
                }
                item.OwnerName = userProfile[0].LastName + " " + userProfile[0].FirstName;
                item.OwnerAvatarImage = userProfile[0].AvatarURL;
            }
            return postList;
        }


        public async Task<IEnumerable<NewFeedModel>> GetPostsByCategoryIdAsync(int CategoryId)
        {
            var postList = await _PostRepository.GetPostsCategoryId(CategoryId).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images)
                    {
                        if (image.MainPost == true)
                        {
                            item.ImageMain = image.src;
                        }
                    }
                }
                else
                {
                    item.ImageMain = null;
                }
                item.OwnerName = userProfile[0].LastName + " " + userProfile[0].FirstName;
                item.OwnerAvatarImage = userProfile[0].AvatarURL;
            }
            return postList;
        }

        public async Task<IEnumerable<NewFeedModel>> GetPostsAsync()
        {
            var postList = await _PostRepository.GetPosts().MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images)
                    {
                        if (image.MainPost == true)
                        {
                            item.ImageMain = image.src;
                        }
                    }
                }
                else
                {
                    item.ImageMain = null;
                }
                item.OwnerName = userProfile[0].LastName + " " + userProfile[0].FirstName;
                item.OwnerAvatarImage = userProfile[0].AvatarURL;
            }
            return postList;
        }

        public async Task<IEnumerable<NewFeedModel>> GetPostOfUserIdAsync(int id)
        {
            var postList = await _PostRepository.GetPostByUserId(id).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images)
                    {
                        if (image.MainPost == true)
                        {
                            item.ImageMain = image.src;
                        }
                    }
                }
                else
                {
                    item.ImageMain = null;
                }


            }
            return postList;
        }


        public async Task<PostModel> GetPostByIdAsync(int id)
        {

            var post = await _PostRepository.GetPostById(id).MapQueryTo<PostModel>(_mapper).FirstOrDefaultAsync();
            var images = await _imagePostRepository.GetImagePostByPostId(post.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
            var userProfile = await _userProfileRepository.GetDistricByUserId(post.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
            post.ImagePostModelRqList = images;
            post.OwnerName = userProfile[0].LastName + " " + userProfile[0].FirstName;
            post.OwnerAvatarImage = userProfile[0].AvatarURL;
            return post;
        }

        public async Task<int> CreatePostAsync(PostModelRq model, UserIdentity<int> issuer)
        {
            try
            {
               
                var entity = _mapper.Map<Post>(model);
                entity.Statuts = PostStatus.Checked;
                entity.Active = false;
                entity.UserId = issuer.Id;
                entity.CreateBy(issuer).UpdateBy(issuer);
                _PostRepository.Create(entity);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    foreach (var ImagePostModelRq in model.ImagePostModelRqList)
                    {
                        var ModelRq = new ImagePostModelRq();
                        ModelRq = ImagePostModelRq;
                        ModelRq.PostId = entity.Id;
                        await _imagePostService.CreateImagePostAsync(ModelRq, issuer);
                    }
                    return entity.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
       public async Task<IEnumerable<PostModel>> GetPostByUserIdAsync(int id)
        {
            return await _PostRepository.GetPostByUserId(id).MapQueryTo<PostModel>(_mapper).ToListAsync();
        }

        public async Task<bool> UpdatePostAsync(int id, PostModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var Post = await _PostRepository.GetEntityByIdAsync(id);
                if (Post == null)
                {
                    return false;
                }
                _mapper.Map(model, Post);
                Post.UpdateBy(issuer);
                _PostRepository.Update(Post);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> ActivePostAsync(int id, int active, UserIdentity<int> issuer)
        {
            try
            {
                var Post = await _PostRepository.GetEntityByIdAsync(id);
                if (Post == null)
                {
                    return false;
                }
                if (active ==1)
                {
                    Post.Active = true;
                }
                else if(active ==2) { Post.Active = false; }
              
                Post.Statuts = PostStatus.Approve;
                Post.UpdateBy(issuer);
                _PostRepository.Update(Post);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> DeletePostAsync(int id)
        {
            try
            {
                var Post = await _PostRepository.GetEntityByIdAsync(id);
                _PostRepository.Delete(Post);
                if (await _uow.SaveChangesAsync() == 1)
                {
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
