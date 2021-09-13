using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.DbMigration.Migrations
{
    public partial class UserUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(8235), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 705, DateTimeKind.Unspecified).AddTicks(6614), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(7903), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 705, DateTimeKind.Unspecified).AddTicks(6234), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4566), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 697, DateTimeKind.Unspecified).AddTicks(5450), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4238), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 697, DateTimeKind.Unspecified).AddTicks(4666), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 345, DateTimeKind.Unspecified).AddTicks(2968), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 693, DateTimeKind.Unspecified).AddTicks(8348), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 340, DateTimeKind.Unspecified).AddTicks(7012), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 689, DateTimeKind.Unspecified).AddTicks(7536), new TimeSpan(0, 7, 0, 0, 0)));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 705, DateTimeKind.Unspecified).AddTicks(6614), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(8235), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionMembership",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 705, DateTimeKind.Unspecified).AddTicks(6234), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 351, DateTimeKind.Unspecified).AddTicks(7903), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 697, DateTimeKind.Unspecified).AddTicks(5450), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4566), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "PermissionGroup",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 697, DateTimeKind.Unspecified).AddTicks(4666), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 348, DateTimeKind.Unspecified).AddTicks(4238), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "UpdatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 693, DateTimeKind.Unspecified).AddTicks(8348), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 345, DateTimeKind.Unspecified).AddTicks(2968), new TimeSpan(0, 7, 0, 0, 0)));

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "CreatedDate",
                table: "MenuPermission",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 9, 51, 30, 689, DateTimeKind.Unspecified).AddTicks(7536), new TimeSpan(0, 7, 0, 0, 0)),
                oldClrType: typeof(DateTimeOffset),
                oldDefaultValue: new DateTimeOffset(new DateTime(2020, 11, 14, 11, 7, 53, 340, DateTimeKind.Unspecified).AddTicks(7012), new TimeSpan(0, 7, 0, 0, 0)));
        }
    }
}
