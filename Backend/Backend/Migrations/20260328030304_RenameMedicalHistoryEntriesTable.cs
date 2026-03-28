using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class RenameMedicalHistoryEntriesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "MedicalHistoryEntry",
                newName: "MedicalHistoryEntries");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "MedicalHistoryEntries",
                newName: "MedicalHistoryEntry");
        }
    }
}