                                                                                            namespace ApplicationDomain.Helper
{
    public class ConditionProduct
    {
        public static int New = 1;
        public static int Old = 2;
    
        public static string GetName(int StatusId)
        {
            if (StatusId == ConditionProduct.New) return "Mới";
            else if (StatusId == ConditionProduct.Old) return "Đã qua sử dụng";
            return "Đã qua sử dụng";
        }
    }
}
