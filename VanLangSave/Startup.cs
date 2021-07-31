using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VanLangSave.Startup))]
namespace VanLangSave
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
