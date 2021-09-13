using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.DbMigration.Migrations
{
    public partial class SosialDBUpdate333 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "UserProfile",
                nullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(3267), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 314, DateTimeKind.Unspecified).AddTicks(3475), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(2875), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 314, DateTimeKind.Unspecified).AddTicks(3020), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(4689), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 310, DateTimeKind.Unspecified).AddTicks(2997), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(3870), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 310, DateTimeKind.Unspecified).AddTicks(2620), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 103, DateTimeKind.Unspecified).AddTicks(6366), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 307, DateTimeKind.Unspecified).AddTicks(191), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 98, DateTimeKind.Unspecified).AddTicks(3963), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 302, DateTimeKind.Unspecified).AddTicks(9952), new TimeSpan(0, 7, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "UserProfile");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 314, DateTimeKind.Unspecified).AddTicks(3475), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(3267), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 314, DateTimeKind.Unspecified).AddTicks(3020), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 113, DateTimeKind.Unspecified).AddTicks(2875), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 310, DateTimeKind.Unspecified).AddTicks(2997), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(4689), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 310, DateTimeKind.Unspecified).AddTicks(2620), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 109, DateTimeKind.Unspecified).AddTicks(3870), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 307, DateTimeKind.Unspecified).AddTicks(191), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 103, DateTimeKind.Unspecified).AddTicks(6366), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 18, 18, 10, 302, DateTimeKind.Unspecified).AddTicks(9952), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 15, 3, 30, 3, 98, DateTimeKind.Unspecified).AddTicks(3963), new TimeSpan(0, 7, 0, 0, 0)));
        }
    }
}
