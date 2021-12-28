 namespace ApplicationDomain.Helper
{
    public class ExchangePostUserRegister
    {
        public static int Waiting = 1;
        public static int Rejected = 3;
        public static int Approve = 4;
        public static int Done = 5;
        public static string GetName(int StatusId)
        {
            if (StatusId == ExchangePostUserRegister.Waiting) return "Đang chờ phản hồi";
            else if (StatusId == ExchangePostUserRegister.Approve) return "Chấp nhận trao đổi";
            else if (StatusId == ExchangePostUserRegister.Rejected) return "Từ chối trao đổi";
            else if (StatusId == ExchangePostUserRegister.Done) return "Hoàn tất trao đổi";
            return "Đang chờ";
        }
    }
}
 