using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.DbMigration.Migrations
{
    public partial class SosialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 222, DateTimeKind.Unspecified).AddTicks(5787), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(8235), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 222, DateTimeKind.Unspecified).AddTicks(5452), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(7903), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 219, DateTimeKind.Unspecified).AddTicks(816), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4566), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 219, DateTimeKind.Unspecified).AddTicks(486), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4238), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 215, DateTimeKind.Unspecified).AddTicks(8187), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 345, DateTimeKind.Unspecified).AddTicks(2968), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 211, DateTimeKind.Unspecified).AddTicks(6775), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 340, DateTimeKind.Unspecified).AddTicks(7012), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.CreateTable(
                name: "Post",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    CreatedByUserId = table.Column<int>(nullable: false),
                    CreatedByUserName = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedByUserId = table.Column<int>(nullable: false),
                    UpdatedByUserName = table.Column<string>(nullable: true),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    ImageURL = table.Column<string>(nullable: true),
                    CategroriesId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Post", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Post_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supplier",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    CreatedByUserId = table.Column<int>(nullable: false),
                    CreatedByUserName = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedByUserId = table.Column<int>(nullable: false),
                    UpdatedByUserName = table.Column<string>(nullable: true),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    address = table.Column<string>(nullable: true),
                    ImageURL = table.Column<string>(nullable: true),
                    typeSupplier = table.Column<int>(nullable: false),
                    evaluate = table.Column<double>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supplier_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductNeed",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    CreatedByUserId = table.Column<int>(nullable: false),
                    CreatedByUserName = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedByUserId = table.Column<int>(nullable: false),
                    UpdatedByUserName = table.Column<string>(nullable: true),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    ImageURL = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    PostId = table.Column<int>(nullable: false),
                    expectedPrice = table.Column<double>(nullable: false),
                    expectedProduct = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductNeed", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductNeed_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SupplierSuggest",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    CreatedByUserId = table.Column<int>(nullable: false),
                    CreatedByUserName = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedByUserId = table.Column<int>(nullable: false),
                    UpdatedByUserName = table.Column<string>(nullable: true),
                    RowVersion = table.Column<byte[]>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    Status = table.Column<int>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    ProductNeedId = table.Column<int>(nullable: false),
                    SupplierId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SupplierSuggest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SupplierSuggest_ProductNeed_ProductNeedId",
                        column: x => x.ProductNeedId,
                        principalTable: "ProductNeed",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SupplierSuggest_Supplier_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Supplier",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Post_UserId",
                table: "Post",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductNeed_PostId",
                table: "ProductNeed",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_UserId",
                table: "Supplier",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SupplierSuggest_ProductNeedId",
                table: "SupplierSuggest",
                column: "ProductNeedId");

            migrationBuilder.CreateIndex(
                name: "IX_SupplierSuggest_SupplierId",
                table: "SupplierSuggest",
                column: "SupplierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SupplierSuggest");

            migrationBuilder.DropTable(
                name: "ProductNeed");

            migrationBuilder.DropTable(
                name: "Supplier");

            migrationBuilder.DropTable(
                name: "Post");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(8235), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 222, DateTimeKind.Unspecified).AddTicks(5787), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(7903), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 222, DateTimeKind.Unspecified).AddTicks(5452), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4566), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 219, DateTimeKind.Unspecified).AddTicks(816), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4238), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 219, DateTimeKind.Unspecified).AddTicks(486), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 345, DateTimeKind.Unspecified).AddTicks(2968), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 215, DateTimeKind.Unspecified).AddTicks(8187), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 340, DateTimeKind.Unspecified).AddTicks(7012), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 17, 26, 59, 211, DateTimeKind.Unspecified).AddTicks(6775), new TimeSpan(0, 7, 0, 0, 0)));
        }
    }
}
