using ApplicationDomain.BOA.Entities;
using AspNetCore.Mvc.JwtBearer;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.UserProfiles
{
    public class LoginModel
    {
        public JwtToken Token { get; set; }
        public UserProfileModel UserProfile { get; set; }
      
    }

    
}
