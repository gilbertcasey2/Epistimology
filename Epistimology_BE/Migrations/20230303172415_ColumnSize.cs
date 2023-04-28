using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epistimology_BE.Migrations
{
    /// <inheritdoc />
    public partial class ColumnSize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "fieldSize",
                table: "columns",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "columns",
                keyColumn: "id",
                keyValue: 1,
                column: "fieldSize",
                value: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "fieldSize",
                table: "columns");
        }
    }
}
