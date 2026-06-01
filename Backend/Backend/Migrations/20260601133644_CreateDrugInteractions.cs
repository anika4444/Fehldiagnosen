using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class CreateDrugInteractions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AtcDrugMappings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    AtcCode = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false),
                    DrugBankId = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    DrugName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AtcDrugMappings", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DrugInteractions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    SourceDrugBankId = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    TargetDrugBankId = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false),
                    TargetName = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrugInteractions", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AtcDrugMappings_AtcCode",
                table: "AtcDrugMappings",
                column: "AtcCode");

            migrationBuilder.CreateIndex(
                name: "IX_DrugInteractions_SourceDrugBankId",
                table: "DrugInteractions",
                column: "SourceDrugBankId");

            migrationBuilder.CreateIndex(
                name: "IX_DrugInteractions_SourceDrugBankId_TargetDrugBankId",
                table: "DrugInteractions",
                columns: new[] { "SourceDrugBankId", "TargetDrugBankId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AtcDrugMappings");

            migrationBuilder.DropTable(
                name: "DrugInteractions");
        }
    }
}
