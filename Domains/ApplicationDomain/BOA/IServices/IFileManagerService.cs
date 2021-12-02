using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.Common.Identity;

namespace ApplicationDomain.BOA.IServices
{
    public interface IFileManagerService
    {
        Task<UserProfileModel> UploadAvatarAsync(IFormFile formFile, int userProfileId, UserIdentity<int> issuer);
        string GetDefaultFolderUrl();
        string GetImageAssetpartFolderUrl();
        string GetImageEmployeeAvatarFolderUrl();
        string GetImageFolderUrl();
        string GetImageCompanyLogoFolderUrl();
        string GetImageCRMTemplateFolderUrl();
        string GetImageCustomerTransfersFolderUrl();
        Task<string> UploadFileDefaultAsync(IFormFile formFile);
        Task<string> UploadFileAsync(IFormFile formFile, string folderUrl);
        string GetProductFileFolderUrl();
    }
}
