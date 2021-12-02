using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfigurations.BOA.Social
{
    public class CategoryConfiguration : EntityConfigurationBase<Category, int>
    {
        public override void OnConfigure(EntityTypeBuilder<Category> builder)
        {
        }
    }
}
