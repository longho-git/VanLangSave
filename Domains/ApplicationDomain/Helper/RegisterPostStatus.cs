 namespace ApplicationDomain.Helper
{
    public class RegisterPostStatus
    {
        public static int Waiting = 1;
        public static int WaitingUserRegister = 2;
        public static int Rejected = 4;
        public static int Done = 5;
        public static string GetName(int StatusId)
        {
            if (StatusId == RegisterPostStatus.Waiting) return "Đang chờ phản hồi";
            else if (StatusId == RegisterPostStatus.WaitingUserRegister) return "Đang chờ người đăng ký phản hồi";
            else if (StatusId == RegisterPostStatus.Rejected) return "Trao đổi không thành công";
            else if (StatusId == RegisterPostStatus.Done) return "Hoàn tất trao đổi";
            return "Đang chờ";
        }
    }
}
 