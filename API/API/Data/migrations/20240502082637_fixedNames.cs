using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.data.migrations
{
    /// <inheritdoc />
    public partial class fixedNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "title",
                table: "HomePages",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "content",
                table: "HomePages",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "HomePages",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "HomePages",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "HomePages",
                newName: "content");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "HomePages",
                newName: "id");
        }
    }
}
