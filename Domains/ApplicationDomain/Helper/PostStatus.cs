 namespace ApplicationDomain.Helper
{
    public class PostStatus
    {
        public static int Checked = 1;
        public static int Done = 2;
        public static int Rejected = 3;
        public static int Approve = 4;
        public static int Deal = 5;
        public static int Hidden = 6;
        public static string GetName(int StatusId)
        {
            if (StatusId == PostStatus.Checked) return "Đang xét duyệt";
            else if (StatusId == PostStatus.Approve) return "Hoạt động";
            else if (StatusId == PostStatus.Rejected) return "Không duyệt";
            else if (StatusId == PostStatus.Deal) return "Đang giao dịch";
            else if (StatusId == PostStatus.Done) return " Hoàn tất giao dịch";
            else if (StatusId == PostStatus.Hidden) return "Bài viết bị ẩn";
            return "Đang xét duyệt";
        }
    }
}
 