using ApplicationDomain.BOA.Entities;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.IServices;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models;

namespace ApplicationDomain.BOA.Services
{
    public class ImagePostService : ServiceBase, IImagePostService
    {
        private readonly IImagePostRepository _ImagePostRepository;
        public ImagePostService(
            IImagePostRepository ImagePostRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _ImagePostRepository = ImagePostRepository;
        }

        public async Task<IEnumerable<ImagePostModel>> GetImagePostsAsync()
        {
            return await _ImagePostRepository.GetImagePosts().MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
        }

        public async Task<ImagePostModel> GetImagePostByIdAsync(int id)
        {
            return await _ImagePostRepository.GetImagePostById(id).MapQueryTo<ImagePostModel>(_mapper).FirstOrDefaultAsync();
        }

      
       public async Task<IEnumerable<ImagePostModel>> GetImagePostByPostIdAsync(int id)
        {
            return await _ImagePostRepository.GetImagePostByPostId(id).MapQueryTo<ImagePostModel>(_mapper).ToListAsync();
        }

        public async Task<bool> UpdateImagePostAsync(int id, ImagePostModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var ImagePost = await _ImagePostRepository.GetEntityByIdAsync(id);
                if (ImagePost == null)
                {
                    return false;
                }
                _mapper.Map(model, ImagePost);
                ImagePost.UpdateBy(issuer);
                _ImagePostRepository.Update(ImagePost);
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
        public async Task<int> CreateImagePostAsync(ImagePostModelRq model, UserIdentity<int> issuer)
        {
            try
            {
                var ImagePost = _mapper.Map<ImagePost>(model);
                ImagePost.CreateBy(issuer).UpdateBy(issuer);
                _ImagePostRepository.Create(ImagePost);
                if (await _uow.SaveChangesAsync() == 1)
                {

                    return ImagePost.Id;
                }
                return 0;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<bool> DeleteImagePostAsync(int id)
        {
            try
            {
                var ImagePost = await _ImagePostRepository.GetEntityByIdAsync(id);
                _ImagePostRepository.Delete(ImagePost);
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
