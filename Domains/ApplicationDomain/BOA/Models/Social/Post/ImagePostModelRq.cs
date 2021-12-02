using ApplicationDomain.BOA.Entities;
using AutoMapper;

namespace ApplicationDomain.BOA.Models
{
    public class ImagePostModelRq
    {
        public int? Id { get; set; }
        public string src { get; set; }
        public bool MainPost { get; set; }
        public int PostId { get; set; }

    }
    public class ImageModelPostRqMapper : Profile
    {
        public ImageModelPostRqMapper()
        {
            CreateMap<ImagePostModelRq, ImagePost>();
            var mapers = CreateMap< ImagePost, ImagePostModelRq>();

        }
    }
}
