using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddKnownMedication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Darreichungsform",
                table: "KnownMedications");

            migrationBuilder.RenameColumn(
                name: "Wirkstoff",
                table: "KnownMedications",
                newName: "Substance");

            migrationBuilder.RenameColumn(
                name: "Staerke",
                table: "KnownMedications",
                newName: "PrescriptionRequired");

            migrationBuilder.RenameColumn(
                name: "Rezeptpflichtig",
                table: "KnownMedications",
                newName: "Dosage");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Substance",
                table: "KnownMedications",
                newName: "Wirkstoff");

            migrationBuilder.RenameColumn(
                name: "PrescriptionRequired",
                table: "KnownMedications",
                newName: "Staerke");

            migrationBuilder.RenameColumn(
                name: "Dosage",
                table: "KnownMedications",
                newName: "Rezeptpflichtig");

            migrationBuilder.AddColumn<string>(
                name: "Darreichungsform",
                table: "KnownMedications",
                type: "longtext",
                nullable: true);
        }
    }
}
