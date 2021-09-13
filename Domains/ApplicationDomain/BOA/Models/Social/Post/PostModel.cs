using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.Posts
{
    public class PostModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Type { get; set; }
        public int Statuts { get; set; }
        public bool Active { get; set; }
        public int UserId { get; set; }
        public string UserUserName { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public IEnumerable<ImagePostModel> ImagePostModelRqList { get; set; }
        public PostModel()
        {
            this.Id = 0;
            this.Title = "";
            this.Content = "";
            this.Type = 1;
            this.Statuts = 1;
            this.Active = false;
            this.UserId = 0;
            this.UserUserName = "";
            this.CreatedDate = DateTime.Now; 
            this.ImagePostModelRqList = new List<ImagePostModel>() { new ImagePostModel() };
        }
    }

    public class PostModelMapper : Profile
    {
        public PostModelMapper()
        {
            CreateMap<Post, PostModel>();
            var mapers = CreateMap<Post, PostModel>();
      
        }
    }
}
