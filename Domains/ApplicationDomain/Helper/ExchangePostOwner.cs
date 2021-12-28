 namespace ApplicationDomain.Helper
{
    public class ExchangePostOwner
    {
        public static int Checked = 1;
        public static int Rejected = 3;
        public static int Approve = 4;
        public static int Done = 5;
        public static string GetName(int StatusId)
        {
            if (StatusId == ExchangePostOwner.Checked) return "Đang chờ phản hồi";
            else if (StatusId == ExchangePostOwner.Approve) return "Chấp nhận trao đổi";
            else if (StatusId == ExchangePostOwner.Rejected) return "Từ chối trao đổi";
            else if (StatusId == ExchangePostOwner.Done) return "Hoàn tất trao đổi";
            return "Đang chờ";
        }
    }
}
 