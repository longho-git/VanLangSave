 namespace ApplicationDomain.Helper
{
    public class RegisterPost
    {
        public static int Checked = 1;
        public static int Rejected = 3;
        public static int Approve = 4;
        public static string GetName(int StatusId)
        {
            if (StatusId == RegisterPost.Checked) return "Đang chờ phản hồi";
            else if (StatusId == RegisterPost.Approve) return "Chấp nhận";
            else if (StatusId == RegisterPost.Rejected) return "Từ chối";
            return "Đang chờ";
        }
    }
}
 