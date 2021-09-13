using Microsoft.AspNetCore.Http;

namespace ApplicationDomain.BOA.Models.FormFiles
{
    public class FormFileModelRq
    {
        public IFormFile File { get; set; }
        public string FolderUrl { get; set; }
    }
}
