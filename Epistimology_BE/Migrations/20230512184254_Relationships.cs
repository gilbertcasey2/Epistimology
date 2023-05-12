using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Epistimology_BE.Migrations
{
    /// <inheritdoc />
    public partial class Relationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "papers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.CreateTable(
                name: "PaperTag",
                columns: table => new
                {
                    papersid = table.Column<int>(type: "int", nullable: false),
                    tagsid = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaperTag", x => new { x.papersid, x.tagsid });
                    table.ForeignKey(
                        name: "FK_PaperTag_papers_papersid",
                        column: x => x.papersid,
                        principalTable: "papers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PaperTag_tags_tagsid",
                        column: x => x.tagsid,
                        principalTable: "tags",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "paperValues",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paperValues", x => x.id);
                    table.ForeignKey(
                        name: "FK_paperValues_columns_id",
                        column: x => x.id,
                        principalTable: "columns",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_paperValues_papers_id",
                        column: x => x.id,
                        principalTable: "papers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PaperTag_tagsid",
                table: "PaperTag",
                column: "tagsid");

            migrationBuilder.AddForeignKey(
                name: "FK_papers_categories_id",
                table: "papers",
                column: "id",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_papers_categories_id",
                table: "papers");

            migrationBuilder.DropTable(
                name: "PaperTag");

            migrationBuilder.DropTable(
                name: "paperValues");

            migrationBuilder.AlterColumn<int>(
                name: "id",
                table: "papers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);
        }
    }
}
