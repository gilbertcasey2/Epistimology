using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epistimology_BE.Migrations
{
    /// <inheritdoc />
    public partial class FixCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_papers_categories_categoryid",
                table: "papers");

            migrationBuilder.AlterColumn<int>(
                name: "categoryid",
                table: "papers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_papers_categories_categoryid",
                table: "papers",
                column: "categoryid",
                principalTable: "categories",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_papers_categories_categoryid",
                table: "papers");

            migrationBuilder.AlterColumn<int>(
                name: "categoryid",
                table: "papers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_papers_categories_categoryid",
                table: "papers",
                column: "categoryid",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
