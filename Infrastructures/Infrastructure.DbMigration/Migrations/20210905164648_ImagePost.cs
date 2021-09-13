using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.DbMigration.Migrations
{
    public partial class ImagePost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 951, DateTimeKind.Unspecified).AddTicks(8569), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(9139), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 951, DateTimeKind.Unspecified).AddTicks(8114), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(8816), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 946, DateTimeKind.Unspecified).AddTicks(7710), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6445), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 946, DateTimeKind.Unspecified).AddTicks(7362), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6127), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 943, DateTimeKind.Unspecified).AddTicks(7419), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 29, DateTimeKind.Unspecified).AddTicks(7290), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 940, DateTimeKind.Unspecified).AddTicks(2346), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 26, DateTimeKind.Unspecified).AddTicks(2178), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.CreateTable(
                name: "ImagePost",
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
                    ImageURL = table.Column<string>(nullable: true),
                    MainPost = table.Column<bool>(nullable: false),
                    PostId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImagePost", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImagePost_Post_PostId",
                        column: x => x.PostId,
                        principalTable: "Post",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImagePost_PostId",
                table: "ImagePost",
                column: "PostId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImagePost");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(9139), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 951, DateTimeKind.Unspecified).AddTicks(8569), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(8816), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 951, DateTimeKind.Unspecified).AddTicks(8114), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6445), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 946, DateTimeKind.Unspecified).AddTicks(7710), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6127), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 946, DateTimeKind.Unspecified).AddTicks(7362), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 29, DateTimeKind.Unspecified).AddTicks(7290), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 943, DateTimeKind.Unspecified).AddTicks(7419), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 26, DateTimeKind.Unspecified).AddTicks(2178), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 23, 46, 47, 940, DateTimeKind.Unspecified).AddTicks(2346), new TimeSpan(0, 7, 0, 0, 0)));
        }
    }
}
