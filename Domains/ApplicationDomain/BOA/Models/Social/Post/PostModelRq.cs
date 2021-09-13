using ApplicationDomain.BOA.Entities;
using AutoMapper;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.Posts
{
    public class PostModelRq
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int Type { get; set; }
        public List<ImagePostModelRq> ImagePostModelRqList { get; set; }
    }

    public class PostModelRqMapper : Profile
    {
        public PostModelRqMapper()
        {
            CreateMap<PostModelRq, Post>();
            var mapers = CreateMap<Post, PostModelRq>();
      
        }
    }
    public class PostModelRqValidator : AbstractValidator<PostModelRq>
    {
        public PostModelRqValidator()
        {
            RuleFor(p => p.Title).NotEmpty();
            RuleFor(p => p.Content).NotEmpty();
        }
    }
}
