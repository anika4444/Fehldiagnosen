using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddEmergencyAccess : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Medications",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "EmergencyAccessCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    PublicId = table.Column<string>(type: "varchar(8)", maxLength: 8, nullable: false),
                    TokenHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    PinHash = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    FailedAttempts = table.Column<int>(type: "int", nullable: false),
                    LockedUntil = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeactivatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyAccessCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmergencyAccessCodes_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmergencyAccessLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    CodeType = table.Column<int>(type: "int", nullable: false),
                    Method = table.Column<int>(type: "int", nullable: false),
                    Outcome = table.Column<int>(type: "int", nullable: false),
                    AccessedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IpAddress = table.Column<string>(type: "varchar(45)", maxLength: 45, nullable: true),
                    DeviceType = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    AccessorName = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    AccessorInstitution = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyAccessLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmergencyAccessLogs_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmergencyProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    ConsentGivenAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    TreatmentRequiresApproval = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmergencyProfiles_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmergencyShareSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    CodeType = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<int>(type: "int", nullable: false),
                    IsEnabled = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyShareSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmergencyShareSettings_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EmergencyAccessSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    CodeId = table.Column<int>(type: "int", nullable: false),
                    CodeType = table.Column<int>(type: "int", nullable: false),
                    SessionTokenHash = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false),
                    ApprovalState = table.Column<int>(type: "int", nullable: false),
                    ApprovalExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    AccessLogId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyAccessSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmergencyAccessSessions_EmergencyAccessCodes_CodeId",
                        column: x => x.CodeId,
                        principalTable: "EmergencyAccessCodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmergencyAccessSessions_EmergencyAccessLogs_AccessLogId",
                        column: x => x.AccessLogId,
                        principalTable: "EmergencyAccessLogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessCodes_PatientId_Type_IsActive",
                table: "EmergencyAccessCodes",
                columns: new[] { "PatientId", "Type", "IsActive" });

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessCodes_PublicId",
                table: "EmergencyAccessCodes",
                column: "PublicId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessCodes_TokenHash",
                table: "EmergencyAccessCodes",
                column: "TokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessLogs_PatientId_AccessedAt",
                table: "EmergencyAccessLogs",
                columns: new[] { "PatientId", "AccessedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessSessions_AccessLogId",
                table: "EmergencyAccessSessions",
                column: "AccessLogId");

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessSessions_CodeId",
                table: "EmergencyAccessSessions",
                column: "CodeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessSessions_PatientId_ApprovalState",
                table: "EmergencyAccessSessions",
                columns: new[] { "PatientId", "ApprovalState" });

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyAccessSessions_SessionTokenHash",
                table: "EmergencyAccessSessions",
                column: "SessionTokenHash",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyProfiles_PatientId",
                table: "EmergencyProfiles",
                column: "PatientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmergencyShareSettings_PatientId_CodeType_Category",
                table: "EmergencyShareSettings",
                columns: new[] { "PatientId", "CodeType", "Category" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmergencyAccessSessions");

            migrationBuilder.DropTable(
                name: "EmergencyProfiles");

            migrationBuilder.DropTable(
                name: "EmergencyShareSettings");

            migrationBuilder.DropTable(
                name: "EmergencyAccessCodes");

            migrationBuilder.DropTable(
                name: "EmergencyAccessLogs");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Medications");
        }
    }
}
