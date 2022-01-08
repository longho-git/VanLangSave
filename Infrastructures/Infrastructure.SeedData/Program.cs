using ApplicationDomain.BOA.Entities;
using ApplicationDomain.Core.Entities;
using ApplicationDomain.Helper;
using ApplicationDomain.Identity.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.SeedData
{
    class Program
    {
        public static IServiceProvider _serviceProvider;
        static void Main(string[] args)
        {
            Console.WriteLine("Starting to seed data");
            _serviceProvider = ConfigureService(new ServiceCollection(), args);
            using (var dbContext = _serviceProvider.GetService<ApplicationDbContext>())
            {
                using (var transaction = dbContext.Database.BeginTransaction())
                {
                    SeedDataAsync(dbContext).Wait();
                    transaction.Commit();
                    Console.WriteLine("Commit all seed");
                }
            }
            Console.WriteLine("Seed data successfull");
        }

        public static IServiceProvider ConfigureService(IServiceCollection services, string[] args)
        {
            var dbContextFactory = new DesignTimeDbContextFactory();

            services.AddLogging();
            services.AddScoped<ApplicationDbContext>(p => dbContextFactory.CreateDbContext(args));
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;

                // User settings
                options.User.RequireUniqueEmail = true;
            });
            return services.BuildServiceProvider();
        }
        private static async Task SeedDataAsync(ApplicationDbContext dbContext)
        {
            IdentityResult systemAdminResult = await SeedSystemAdminAsync(dbContext);
            if (systemAdminResult.Succeeded)
            {
                await SeedRoleAsync(dbContext);
            }
            var userManagement = _serviceProvider.GetService<UserManager<User>>();
            var systemAdmin = userManagement.FindByNameAsync("system").Result;
            await userManagement.AddToRoleAsync(systemAdmin, ROLE_CONSTANT.SYSADMIN);
            await SeedEmailTemplate(dbContext);
            await SeedCategoryAsync(dbContext);

        }

    
        private static async Task SeedRoleAsync(ApplicationDbContext dbContext)
        {
            var roleManagers = _serviceProvider.GetService<RoleManager<Role>>();
            var userManager = _serviceProvider.GetService<UserManager<User>>();
            var user = userManager.FindByNameAsync("system").Result;
            await dbContext.SaveChangesAsync();
            var roleSystem = new Role

            {
                Name = ROLE_CONSTANT.SYSADMIN,
                CreatedByUserId = user.Id,
                CreatedDate = DateTimeOffset.UtcNow,
                CreatedByUserName = user.UserName,
                UpdatedByUserId = user.Id,
                UpdatedDate = DateTimeOffset.UtcNow,
                UpdatedByUserName = user.UserName
            };
            await roleManagers.CreateAsync(roleSystem);
            await dbContext.SaveChangesAsync();
            var roleEmployee = new Role
            {
                Name = ROLE_CONSTANT.NORMAL_USER,
                CreatedByUserId = user.Id,
                CreatedDate = DateTimeOffset.UtcNow,
                CreatedByUserName = user.UserName,
                UpdatedByUserId = user.Id,
                UpdatedDate = DateTimeOffset.UtcNow,
                UpdatedByUserName = user.UserName
            };
            await roleManagers.CreateAsync(roleEmployee);
            await dbContext.SaveChangesAsync();
            var roleAdmin = new Role
            {
                Name = ROLE_CONSTANT.MANAGER,
                CreatedByUserId = user.Id,
                CreatedDate = DateTimeOffset.UtcNow,
                CreatedByUserName = user.UserName,
                UpdatedByUserId = user.Id,
                UpdatedDate = DateTimeOffset.UtcNow,
                UpdatedByUserName = user.UserName
            };
            await roleManagers.CreateAsync(roleAdmin);
            await dbContext.SaveChangesAsync();
        }


        private static async Task<IdentityResult> SeedSystemAdminAsync(ApplicationDbContext dbContext)
        {
            try
            {
                if (!await dbContext.Set<User>().AnyAsync())
                {
                    Console.WriteLine("Start to seed sysadmin");

                    var userManagement = _serviceProvider.GetService<UserManager<User>>();
                    var user = new User
                    {
                        UserName = "system",
                        Email = "system@gmail.com",
                        PhoneNumber = "0909123207",
                        CreatedByUserId = 1,
                        CreatedDate = DateTimeOffset.UtcNow,
                        CreatedByUserName = "system",
                        UpdatedByUserId = 1,
                        UpdatedDate = DateTimeOffset.UtcNow,
                        UpdatedByUserName = "system",
                        Status = true,

                    };
                    IdentityResult rs = await userManagement.CreateAsync(user, "Password@1");
                 
                    Console.WriteLine("Finished seed usersysadmin");
                    return rs;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                throw ex;
            }

        }


        private static async Task<int> SeedCompanyAsync(ApplicationDbContext dbContext)
        {
            Console.WriteLine("Start to seed Company");
            var userManagement = _serviceProvider.GetService<UserManager<User>>();
            var system = userManagement.FindByNameAsync("system").Result;
            var model = new Company
            {
                Code = "VNT",
                Email = "VNT@gmail.com",
                Address = "Quận 12",
                Fax = "123456789",
                ForeignName = "Viet Nhat Tan",
                LogoURL = "http://www.vietnhattan.com.vn/wp-content/uploads/2016/12/cropped-VNT_LOGO-192x192.png",
                Name = "CTY TNHH CƠ KHÍ CHÍNH XÁC VIỆT NHẬT TÂN",
                PhoneNumber = "0936915227",
                ShortName = "VNT",
                TaxCode = "123456789",
                WebsiteURL = "http://www.vietnhattan.com.vn/",
                CreatedByUserId = system.Id,
                CreatedByUserName = system.UserName,
                UpdatedByUserId = system.Id,
                UpdatedByUserName = system.UserName,
            };
            await dbContext.AddAsync(model);
            await dbContext.SaveChangesAsync();
            Console.WriteLine("Finished seed Company");
            return model.Id;
        }


        private static async Task<int> SeedCategoryAsync(ApplicationDbContext dbContext)
        {
            Console.WriteLine("Start to seed Category");
            var userManagement = _serviceProvider.GetService<UserManager<User>>();
            var system = userManagement.FindByNameAsync("system").Result;
            var phone = new Category
            {
                Name = "Điện Thoại & Phụ Kiện",
                Col = 3,
                ImageURL = "https://meta.vn/Data/image/2021/07/19/top-nhung-dong-dien-thoai-tot-dang-mua-nhat-hien-nay-3.jpg",
                CreatedByUserId = system.Id,
                CreatedByUserName = system.UserName,
                UpdatedByUserId = system.Id,
                UpdatedByUserName = system.UserName,
            };
            await dbContext.AddAsync(phone);
            await dbContext.SaveChangesAsync();
            var fashion = new Category
            {
                Name = "Thời Trang",
                Col = 3,
                ImageURL = "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                CreatedByUserId = system.Id,
                CreatedByUserName = system.UserName,
                UpdatedByUserId = system.Id,
                UpdatedByUserName = system.UserName,
            };
            await dbContext.AddAsync(fashion);
            await dbContext.SaveChangesAsync();
            var lap = new Category
            {
                Name = "Máy tính $ Laptop",
                Col = 6,
                ImageURL = "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                CreatedByUserId = system.Id,
                CreatedByUserName = system.UserName,
                UpdatedByUserId = system.Id,
                UpdatedByUserName = system.UserName,
            };
            await dbContext.AddAsync(lap);
            await dbContext.SaveChangesAsync();
            var phone1 = new Category
            {
                Name = "Nhà cửa đời sống",
                Col =6,
                ImageURL = "https://images.pexels.com/photos/4262010/pexels-photo-4262010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                CreatedByUserId = system.Id,
                CreatedByUserName = system.UserName,
                UpdatedByUserId = system.Id,
                UpdatedByUserName = system.UserName,
            };
            await dbContext.AddAsync(phone1);
            await dbContext.SaveChangesAsync();
            var fashion1 = new Category
            {
                Name = "Balo túi ví",
                Col = 3,
                ImageURL = "https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                CreatedByUserId = system.Id,
                CreatedByUserName = system.UserName,
                UpdatedByUserId = system.Id,
                UpdatedByUserName = system.UserName,
            };
            await dbContext.AddAsync(fashion1);
            await dbContext.SaveChangesAsync();
            var lap1 = new Category
            {
                Name = "Sách",
                Col = 3,
                ImageURL = "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                CreatedByUserId = system.Id,
                CreatedByUserName = system.UserName,
                UpdatedByUserId = system.Id,
                UpdatedByUserName = system.UserName,
            };
            await dbContext.AddAsync(lap1);
            await dbContext.SaveChangesAsync();
            Console.WriteLine("Finished seed Branch");
            return 1;
        }

        private static async Task SeedEmailTemplate(ApplicationDbContext dbContext)
        {
            List<EmailTemplate> emailTemplates = new List<EmailTemplate>();
            emailTemplates.Add(new EmailTemplate()
            {
                Name = "NewUserEmail",
                EmailContent = "<span>" +
                "Xin chào #email<br/><br/>" +
                "Dưới đây là thông tin đăng nhập của bạn vào hệ thống của chúng tôi:<br/>" +
                "Tên đăng nhập: <b>#username</b><br />" +
                "Mật khẩu: <b>#password</b><br />" +
                "Để an toàn cho việc đăng nhập vào hệ thống, bạn vui lòng đăng nhập vào hệ thống và sử dụng chức năng đổi mật khẩu.<br/><br/>" +
                "Xin cảm ơn,<br/>" +
                "VNT support" +
                "</span> ",
                EmailSubject = "Thông tin đăng nhập hệ thống [vanlangsave]"
            });
            emailTemplates.Add(new EmailTemplate()
            {
                Name = "ResetUserPasswordEmail",
                EmailContent = "<span>" +
                "Xin chào <b>#email</b>,<br/><br/>" +
                "Mật khẩu cho tài khoản <b>#username</b> của bạn đã thay đổi:<br/>" +
                "Mật khẩu mới: <b>#password</b><br/>" +
                "Để an toàn cho việc đăng nhập vào hệ thống," +
                "bạn vui lòng đăng nhập vào hệ thống và sử dụng chức năng đổi mật khẩu.<br/><br/>" +
                "Xin cảm ơn,<br/>" +
                "VNT support" +
                "</span> ",
                EmailSubject = "Khôi phục mật khẩu đăng nhập hệ thống [vanlangsave]"
            });
            emailTemplates.Add(new EmailTemplate()
            {
                Name = "ChangeUserPasswordEmail",
                EmailContent = "<span>" +
                "Xin chào <b>#email</b>,<br/><br/>" +
                "Mật khẩu cho tài khoản <b>#username</b> của bạn đã thay đổi.<br/><br/>" +
                "Xin cảm ơn,<br/>" +
                "VNT support" +
                "</span> ",
                EmailSubject = "Thay đổi mật khẩu đăng nhập hệ thống [vanlangsave]"
            });
            dbContext.AddRange(emailTemplates);
            await dbContext.SaveChangesAsync();
        }


    
















   
    }
}
