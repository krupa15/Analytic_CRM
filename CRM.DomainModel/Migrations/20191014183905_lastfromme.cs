using Microsoft.EntityFrameworkCore.Migrations;

namespace CRM.DomainModel.Migrations
{
    public partial class lastfromme : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "Orders",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Orders");
        }
    }
}
