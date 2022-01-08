using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationDomain.BOA.Models.Social
{
    class StaticsticModel
    {

        public int CountPost { get; set; }
        public int CountTrans { get; set; }
        public int CountUser { get; set; }
        public List<StaticsticUserModel> UserList { get; set; }
    }
}
