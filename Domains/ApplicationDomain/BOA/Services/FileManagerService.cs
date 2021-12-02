using ApplicationDomain.BOA.IServices;
using AspNetCore.Common.Dropbox;
using AspNetCore.UnitOfWork;
using AutoMapper;
using Dropbox.Api;
using Dropbox.Api.Files;
using Dropbox.Api.Sharing;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;
using ApplicationDomain.BOA.IRepositories;
using ApplicationDomain.BOA.Models.UserProfiles;
using AspNetCore.Common.Identity;
using AspNetCore.DataBinding.AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ApplicationDomain.BOA.Services
{
    public class FileManagerService : ServiceBase, IFileManagerService
    {
        private readonly IDropbox _dropbox;
        private readonly IUserProfileRepository _userProfileRepository;
        public FileManagerService(
            IDropbox dropbox,
            IUserProfileRepository userProfileRepository,
            IMapper mapper,
            IUnitOfWork uow
            ) : base(mapper, uow)
        {
            _dropbox = dropbox;
            _userProfileRepository = userProfileRepository;
        }

        public string GetDefaultFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetDefaultUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetImageAssetpartFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetImageUrl()
                            + _dropbox.GetLv4AssetpartUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetImageEmployeeAvatarFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetImageUrl()
                            + _dropbox.GetLv4EmployeeUrl()
                            + _dropbox.GetLv5AvatarUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetImageFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetImageUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetImageCompanyLogoFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetImageUrl()
                            + _dropbox.GetLv4CompanyUrl()
                            + _dropbox.GetLv5LogoUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetImageCRMTemplateFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetImageUrl()
                            + _dropbox.GetLv4CRMTemplateUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetProductFileFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetFileUrl()
                            + _dropbox.GetLv4ProductUrl()
                            + _dropbox.GetLv5DrawingUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string GetImageCustomerTransfersFolderUrl()
        {
            try
            {
                return @"/" + _dropbox.GetLv1CompanyCodeUrl()
                            + _dropbox.GetLv2EnvironmentUrl()
                            + _dropbox.GetLv3AssetImageUrl()
                            + _dropbox.GetLv4CustomerUrl()
                            + _dropbox.GetLv5TransfersUrl();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> UploadFileDefaultAsync(IFormFile formFile)
        {
            try
            {
                using (DropboxClient dbx = new DropboxClient(_dropbox.GetToken()))
                {
                    var extension = Path.GetExtension(formFile.FileName);
                    var fileName = Path.GetRandomFileName() + extension;
                    var filePath = this.GetDefaultFolderUrl() + fileName;
                    var fileStream = formFile.OpenReadStream();
                    var upload = await dbx.Files.UploadAsync(filePath, WriteMode.Overwrite.Instance, false, null, false, null, true, fileStream);
                    SharedLinkMetadata shared = await dbx.Sharing.CreateSharedLinkWithSettingsAsync(upload.PathDisplay);
                    string s = shared != null ? shared.Url : string.Empty;
                    s = s.Replace("?dl=0", "?dl=1");
                    return s;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<UserProfileModel> UploadAvatarAsync(IFormFile formFile,int userProfileId, UserIdentity<int> issuer)
        {
            try
            {
                using (DropboxClient dbx = new DropboxClient(_dropbox.GetToken()))
                {
                    var extension = Path.GetExtension(formFile.FileName);
                    var fileName = Path.GetRandomFileName() + extension;
                    var filePath = this.GetDefaultFolderUrl() + fileName;
                    var fileStream = formFile.OpenReadStream();
                    var upload = await dbx.Files.UploadAsync(filePath, WriteMode.Overwrite.Instance, false, null, false, null, true, fileStream);
                    SharedLinkMetadata shared = await dbx.Sharing.CreateSharedLinkWithSettingsAsync(upload.PathDisplay);
                    string s = shared != null ? shared.Url : string.Empty;
                    s = s.Replace("?dl=0", "?dl=1");
                    var userProfile = await _userProfileRepository.GetEntityByIdAsync(userProfileId);
                    userProfile.AvatarURL = s;
                    userProfile.UpdateBy(issuer);
                    _userProfileRepository.Update(userProfile);
                    var result = await _userProfileRepository.GetUserProfileById(userProfileId).MapQueryTo<UserProfileModel>(_mapper).ToListAsync();
                    result[0].AvatarURL = s;
                    return await _uow.SaveChangesAsync() == 1 ? result[0] : null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> UploadFileAsync(IFormFile formFile, string folderUrl)
        {
            try
            {
                using (DropboxClient dbx = new DropboxClient(_dropbox.GetToken()))
                {
                    var extension = Path.GetExtension(formFile.FileName);
                    var fileName = Path.GetRandomFileName() + extension;
                    var filePath = folderUrl + fileName;
                    var fileStream = formFile.OpenReadStream();
                    var upload = await dbx.Files.UploadAsync(filePath, WriteMode.Overwrite.Instance, false, null, false, null, true, fileStream);
                    SharedLinkMetadata shared = await dbx.Sharing.CreateSharedLinkWithSettingsAsync(upload.PathDisplay);
                    string s = shared != null ? shared.Url : string.Empty;
                    s = s.Replace("?dl=0", "?dl=1");
                    return s;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
