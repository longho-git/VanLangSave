using ApplicationDomain.BOA.Entities;
using ApplicationDomain.Helper;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.Posts
{
    public class NewFeedModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int Type { get; set; }
        public string TypeName
        {
            get
            {
                if (Type == 1)
                {
                    return "Tặng";
                }else
                {
                    return "Trao đổi";
                }
            }
        }
        public int Statuts { get; set; }
        public bool Active { get; set; }
        public string StatusName
        {
            get
            {
                return PostStatus.GetName(this.Statuts);
            }
        }
        public int UserId { get; set; }
        public string UserUserName { get; set; }
        public string OwnerAvatarImage { get; set; }
        public string OwnerName { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string ImageMain{ get; set; }
        public int? CategoryId { get; set; }
        public int Condition { get; set; }
        public string ConditionName
        {
            get
            {
                return ConditionProduct.GetName(this.Condition);
            }
        }
        public int Quantity { get; set; }
        public string CategoryName { get; set; }
        public NewFeedModel()
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
            this.ImageMain = "";
            this.OwnerAvatarImage = "";
            this.OwnerName = "";
        }
    }

    public class NewFeedModelMapper : Profile
    {
        public NewFeedModelMapper()
        {
            CreateMap<Post, NewFeedModel>();
            var mapers = CreateMap<Post, NewFeedModel>();
      
        }
    }
}
