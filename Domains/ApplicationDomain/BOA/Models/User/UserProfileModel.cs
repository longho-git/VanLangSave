﻿using ApplicationDomain.BOA.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.UserProfiles
{
    public class UserProfileModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarURL { set; get; }
        public string Code { get; set; }
        public string StudentId { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public DateTime BirthDay { get; set; }
        public int UserId { get; set; }
        public int Sex { get; set; }
    }

    public class UserProfileModelMapper : Profile
    {
        public UserProfileModelMapper()
        {
            CreateMap<UserProfile, UserProfileModel>();
            var mapers = CreateMap<UserProfile, UserProfileModel>();
      
        }
    }
}
