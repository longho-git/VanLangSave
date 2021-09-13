using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.DbMigration.Migrations
{
    public partial class updatePost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "Post");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Post",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Statuts",
                table: "Post",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Post",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(9139), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 866, DateTimeKind.Unspecified).AddTicks(1116), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(8816), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 866, DateTimeKind.Unspecified).AddTicks(748), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6445), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 862, DateTimeKind.Unspecified).AddTicks(8437), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6127), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 862, DateTimeKind.Unspecified).AddTicks(8082), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 29, DateTimeKind.Unspecified).AddTicks(7290), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 859, DateTimeKind.Unspecified).AddTicks(6794), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 26, DateTimeKind.Unspecified).AddTicks(2178), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 856, DateTimeKind.Unspecified).AddTicks(441), new TimeSpan(0, 7, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "Statuts",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Post");

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "Post",
                nullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 866, DateTimeKind.Unspecified).AddTicks(1116), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(9139), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 866, DateTimeKind.Unspecified).AddTicks(748), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 35, DateTimeKind.Unspecified).AddTicks(8816), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 862, DateTimeKind.Unspecified).AddTicks(8437), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6445), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 862, DateTimeKind.Unspecified).AddTicks(8082), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 32, DateTimeKind.Unspecified).AddTicks(6127), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 859, DateTimeKind.Unspecified).AddTicks(6794), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 29, DateTimeKind.Unspecified).AddTicks(7290), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 9, 3, 4, 47, 50, 856, DateTimeKind.Unspecified).AddTicks(441), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 9, 5, 3, 29, 13, 26, DateTimeKind.Unspecified).AddTicks(2178), new TimeSpan(0, 7, 0, 0, 0)));
        }
    }
}
