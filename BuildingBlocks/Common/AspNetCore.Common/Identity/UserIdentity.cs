﻿using System.Collections.Generic;
using AspNetCore.Common.Models;

namespace AspNetCore.Common.Identity
{
    public class UserIdentity<TType>
    {
        public TType Id { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; }
        public EmployeeInfoModel EmployeeInfoModel { get; set; }
    }
}
