using System;
using ApplicationDomain.BOA.Entities;
using ApplicationDomain.Helper;
using AutoMapper;

namespace ApplicationDomain.BOA.Models.Social.RegisterPostExchange
{
    public class HistoryRegisterPostModel
    {
        public DateTimeOffset RegisterDate { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public string Remark { get; set; }
        public string PostTitle { get; set; }
        public string PostConditrion { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }

    }
}
