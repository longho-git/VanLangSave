using ApplicationDomain.BOA.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.EntityConfigurations.BOA
{
    public class CategoryConfiguration : EntityConfigurationBase<Category, int>
    {
        public override void OnConfigure(EntityTypeBuilder<Category> builder)
        {
        }
    }
}
