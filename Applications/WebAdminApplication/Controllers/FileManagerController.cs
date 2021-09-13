using ApplicationDomain.BOA.IServices;
using ApplicationDomain.BOA.Models.FormFiles;
using AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace WebAdminApplication.Controllers
{
    public class FileManagerController : BaseController
    {
        private readonly IFileManagerService _fileManagerService;
        public FileManagerController(IFileManagerService fileManagerService)
        {
            _fileManagerService = fileManagerService;
        }

        [Route("defaultFolderUrl")]
        [HttpGet]
        public IActionResult GetDefaultFolderUrl()
        {
            try
            {
                return OkValueObject(_fileManagerService.GetDefaultFolderUrl());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("imageAssetpartFolderUrl")]
        [HttpGet]
        public IActionResult GetAssetPartFolderUrl()
        {
            try
            {
                return OkValueObject(_fileManagerService.GetImageAssetpartFolderUrl());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("imageEmployeeAvatarFolderUrl")]
        [HttpGet]
        public IActionResult GetEmployeeAvatarFolderUrl()
        {
            try
            {
                return OkValueObject(_fileManagerService.GetImageEmployeeAvatarFolderUrl());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("imageFolderUrl")]
        [HttpGet]
        public IActionResult GetImageFolderUrl()
        {
            try
            {
                return OkValueObject(_fileManagerService.GetImageFolderUrl());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("imageCompanyLogoFolderUrl")]
        [HttpGet]
        public IActionResult GetLogoFolderUrl()
        {
            try
            {
                return OkValueObject(_fileManagerService.GetImageCompanyLogoFolderUrl());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

     
        [Route("productFileFolderUrl")]
        [HttpGet]
        public IActionResult GetProductFileFolderUrl()
        {
            try
            {
                return OkValueObject(_fileManagerService.GetProductFileFolderUrl());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        

        [Route("imageCRMTemplateFolderUrl")]
        [HttpGet]
        public IActionResult GetCRMTemplateImageUrl()
        {
            try
            {
                return OkValueObject(_fileManagerService.GetImageCRMTemplateFolderUrl());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("uploadFileDefault")]
        [HttpPost]
        public async Task<IActionResult> UploadFileDefaultAsync([FromForm] IFormFile formFile)
        {
            try
            {
                return OkValueObject(await _fileManagerService.UploadFileDefaultAsync(formFile));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("uploadFile")]
        [HttpPost]
        public async Task<IActionResult> UploadFileAsync([FromForm] FormFileModelRq modelRq)
        {
            try
            {
                return OkValueObject(await _fileManagerService.UploadFileAsync(modelRq.File, modelRq.FolderUrl));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}