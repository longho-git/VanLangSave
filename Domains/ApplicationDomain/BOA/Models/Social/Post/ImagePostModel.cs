using ApplicationDomain.BOA.Entities;
using AutoMapper;

namespace ApplicationDomain.BOA.Models
{
    public class ImagePostModel 
    {
        public string ImageURL { get; set; }
        public bool MainPost { get; set; }

    }
    public class ImageModelPostMapper : Profile
    {
        public ImageModelPostMapper()
        {
            CreateMap< ImagePostModel, ImagePost>();
            var mapers = CreateMap< ImagePost, ImagePostModel >();

        }
    }
}
