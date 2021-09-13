using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.DbMigration.Migrations
{
    public partial class updateUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "UserProfile");

            migrationBuilder.DropColumn(
                name: "AvatarURL",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "UserProfile",
                newName: "StudentId");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "UserProfile",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "UserProfile",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "UserProfile",
                newName: "AvatarURL");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 328, DateTimeKind.Unspecified).AddTicks(7968), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(3267), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 328, DateTimeKind.Unspecified).AddTicks(7645), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(2875), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 325, DateTimeKind.Unspecified).AddTicks(3992), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(4689), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 325, DateTimeKind.Unspecified).AddTicks(3657), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(3870), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 322, DateTimeKind.Unspecified).AddTicks(4244), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 103, DateTimeKind.Unspecified).AddTicks(6366), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 318, DateTimeKind.Unspecified).AddTicks(2255), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 98, DateTimeKind.Unspecified).AddTicks(3963), new TimeSpan(0, 7, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "UserProfile",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "UserProfile",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "UserProfile",
                newName: "ImageURL");

            migrationBuilder.RenameColumn(
                name: "AvatarURL",
                table: "UserProfile",
                newName: "FullName");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "UserProfile",
                nullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(3267), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 328, DateTimeKind.Unspecified).AddTicks(7968), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(2875), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 328, DateTimeKind.Unspecified).AddTicks(7645), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(4689), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 325, DateTimeKind.Unspecified).AddTicks(3992), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(3870), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 325, DateTimeKind.Unspecified).AddTicks(3657), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 103, DateTimeKind.Unspecified).AddTicks(6366), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 322, DateTimeKind.Unspecified).AddTicks(4244), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 98, DateTimeKind.Unspecified).AddTicks(3963), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2021, 8, 31, 1, 27, 46, 318, DateTimeKind.Unspecified).AddTicks(2255), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "AvatarURL",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
