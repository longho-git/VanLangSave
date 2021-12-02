using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.IServices.Notification;
using ApplicationDomain.BOA.Models;
using ApplicationDomain.BOA.Models.Posts;
using ApplicationDomain.BOA.Models.UserProfiles;
using ApplicationDomain.Helper;
using ApplicationDomain.Identity.Entities;
using ApplicationDomain.Identity.IRepositories;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDomain.BOA.Services.Social
{
    public class PostService : ServiceBase, IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IImagePostService _imagePostService;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IImagePostRepository _imagePostRepository;
        private readonly INotificationClientService _notificationClientService;
        private readonly IUserRepository _userRepository;
        public PostService(
            IPostRepository postRepository,
            IImagePostService imagePostService,
            IImagePostRepository imagePostRepository,
            IUserProfileRepository userProfileRepository,
            IUserRepository userRepository,
            INotificationClientService notificationClientService,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _postRepository = postRepository;
            _imagePostService = imagePostService;
            _imagePostRepository = imagePostRepository;
            _userProfileRepository = userProfileRepository;
            _notificationClientService = notificationClientService;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<NewFeedModel>> GetPostsActiveAsync()
        {
            var postList = await _postRepository.GetPostsActive().MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
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
        public async Task<IEnumerable<NewFeedModel>> SearchPostsActiveAsync(string search)
        {
            var postList = await _postRepository.SearchPostsActive(search).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
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
            var postList = await _postRepository.GetPostsCategoryId(CategoryId).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
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


        public async Task<IEnumerable<NewFeedModel>> GetPostsWaitingAsync()
        {
            var postList = await _postRepository.GetPostsWaiting().MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
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

        public async Task<IEnumerable<NewFeedModel>> GetPostsActiveAdminAsync()
        {
            var postList = await _postRepository.GetPostsActive().MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                var userProfile = await _userProfileRepository.GetDistricByUserId(item.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
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

        public async Task<IEnumerable<NewFeedModel>> GetPostOfUserIdAsync(int id,int statusId)
        {
            var postList = await _postRepository.GetPostByUserId(id, statusId).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
                    }
                }
                else
                {
                    item.ImageMain = null;
                }
            }
            return postList;
        }

        public async Task<IEnumerable<NewFeedModel>> GetAllPostOfUserIdAsync(int id)
        {
            var postList = await _postRepository.GetAllPostByUserId(id).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
                    }
                }
                else
                {
                    item.ImageMain = null;
                }
            }
            return postList;
        }
        public async Task<IEnumerable<NewFeedModel>> GetPostByUserProfileIdAsync(int id)
        {
            var postList = await _postRepository.GetPostByUserProfileId(id).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
                    }
                }
                else
                {
                    item.ImageMain = null;
                }
            }
            return postList;
        }
        public async Task<IEnumerable<NewFeedModel>> GetPostActiveOfUserIdAsync(int id)
        {
            var postList = await _postRepository.GetPostActiveByUserId(id).MapQueryTo<NewFeedModel>(_mapper).ToListAsync();
            foreach (var item in postList)
            {
                var images = await _imagePostRepository.GetImagePostByPostId(item.Id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
                if (images.Count > 0)
                {
                    foreach (var image in images.Where(image => image.MainPost == true))
                    {
                        item.ImageMain = image.src;
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

            var post = await _postRepository.GetPostById(id).MapQueryTo<PostModel>(_mapper).FirstOrDefaultAsync();
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
                var actor = await _userProfileRepository.GetDistricByUserId(issuer.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var entity = _mapper.Map<Post>(model);
                entity.UserProfileId = actor[0].Id;
                entity.Statuts = PostStatus.Checked;
                entity.Active = false;
                entity.UserId = issuer.Id;
                entity.CreateBy(issuer).UpdateBy(issuer);
                _postRepository.Create(entity);
                if (await _uow.SaveChangesAsync() != 1) return 0;
                foreach (var modelRq in from imagePostModelRq in model.ImagePostModelRqList let modelRq = new ImagePostModelRq() select imagePostModelRq)
                {
                    modelRq.PostId = entity.Id;
                    await _imagePostService.CreateImagePostAsync(modelRq, issuer);
                }
                var sysAdmin = await _userRepository.GetSYSADMINUsers().MapQueryTo<User>(_mapper).ToListAsync();
                var recipient = await _userProfileRepository.GetDistricByUserId(sysAdmin[0].Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var notification = new NotificationClientModelRq()
                {
                    ActorId = actor[0].Id,
                    EntityId = entity.Id,
                    MainURL = "admin/postwaiting",
                    Message = MessageRaw.UserCreate,
                    RecipientId = recipient[0].Id,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return entity.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
     

        public async Task<bool> UpdatePostAsync(int id, PostModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var Post = await _postRepository.GetEntityByIdAsync(id);
                if (Post == null)
                {
                    return false;
                }
                _mapper.Map(model, Post);
                Post.UpdateBy(issuer);
                _postRepository.Update(Post);
                if (await _uow.SaveChangesAsync() != 1) return false;
                foreach (var imagePostModelRq in model.ImagePostModelRqList)
                {
                    if (imagePostModelRq.Id == null)
                    {
                        imagePostModelRq.PostId = Post.Id;
                        await _imagePostService.CreateImagePostAsync(imagePostModelRq, issuer);
                    }
                    else
                    {
                        var imagePost = await _imagePostRepository.GetEntityByIdAsync(imagePostModelRq.Id.Value);
                        _mapper.Map(imagePostModelRq, imagePost);
                        imagePost.PostId = id;
                        imagePost.UpdateBy(issuer);
                        _imagePostRepository.Update(imagePost);
                        await _uow.SaveChangesAsync();
                    }
                       
                }
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> ApprovePostAsync(int id, UserIdentity<int> issuer)
        {
            try
            {
                var post = await _postRepository.GetEntityByIdAsync(id);
                if (post == null)
                {
                    return false;
                }
                else if (post.Active)
                {
                    return false;
                }
                post.Active = true;
                post.Statuts = PostStatus.Approve;

       
                post.UpdateBy(issuer);
                _postRepository.Update(post);
                if (await _uow.SaveChangesAsync() != 1) return false;
                var actor = await _userProfileRepository.GetDistricByUserId(issuer.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var recipient = await _userProfileRepository.GetDistricByUserId(post.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var notification = new NotificationClientModelRq()
                {
                    ActorId = actor[0].Id,
                    EntityId = post.Id,
                    MainURL = "post/"+ post.Id,
                    Message ="Bài viết "+ post.Title + MessageRaw.AprovePost,
                    RecipientId = recipient[0].Id,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> RejectedPostAsync(int id, UserIdentity<int> issuer)
        {
            try
            {
                var post = await _postRepository.GetEntityByIdAsync(id);
                if (post == null)
                {
                    return false;
                }
                else if (post.Active)
                {
                    return false;
                }
                post.Statuts = PostStatus.Rejected;
                post.UpdateBy(issuer);
                _postRepository.Update(post);
                if (await _uow.SaveChangesAsync() != 1) return false;
                var actor = await _userProfileRepository.GetDistricByUserId(issuer.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var recipient = await _userProfileRepository.GetDistricByUserId(post.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var notification = new NotificationClientModelRq()
                {
                    ActorId = actor[0].Id,
                    EntityId = post.Id,
                    MainURL = "post/" + post.Id,
                    Message = "Bài viết " + post.Title + MessageRaw.RejectPost,
                    RecipientId = recipient[0].Id,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> HiddenPostAsync(int id, UserIdentity<int> issuer)
        {
            try
            {
                var post = await _postRepository.GetEntityByIdAsync(id);
                if (post == null)
                {
                    return false;
                }
                else if (!post.Active)
                {
                    return false;
                }
                post.Statuts = PostStatus.Hidden;
                post.UpdateBy(issuer);
                _postRepository.Update(post);
                if (await _uow.SaveChangesAsync() != 1) return false;
                var actor = await _userProfileRepository.GetDistricByUserId(issuer.Id).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var recipient = await _userProfileRepository.GetDistricByUserId(post.UserId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                var notification = new NotificationClientModelRq()
                {
                    ActorId = actor[0].Id,
                    EntityId = post.Id,
                    MainURL = "post/" + post.Id,
                    Message = "Bài viết " + post.Title + MessageRaw.HiddenPost,
                    RecipientId = recipient[0].Id,
                };
                await _notificationClientService.CreateNotificationAsync(notification, issuer);
                return true;
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
                var Post = await _postRepository.GetEntityByIdAsync(id);
                _postRepository.Delete(Post);
                return await _uow.SaveChangesAsync() == 1;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
