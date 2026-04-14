using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCommunicationLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommunicationLevels_Patients_PatientId",
                table: "CommunicationLevels");

            migrationBuilder.DropIndex(
                name: "IX_CommunicationLevels_PatientId",
                table: "CommunicationLevels");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "CommunicationLevels");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "CommunicationLevels");

            migrationBuilder.RenameColumn(
                name: "Level",
                table: "CommunicationLevels",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "CommunicationLevelId",
                table: "Patients",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ActionRecommendation",
                table: "CommunicationLevels",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CommunicationLevels",
                type: "longtext",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "KiPrompt",
                table: "CommunicationLevels",
                type: "longtext",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_CommunicationLevelId",
                table: "Patients",
                column: "CommunicationLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_CommunicationLevels_CommunicationLevelId",
                table: "Patients",
                column: "CommunicationLevelId",
                principalTable: "CommunicationLevels",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_CommunicationLevels_CommunicationLevelId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_CommunicationLevelId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "CommunicationLevelId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "ActionRecommendation",
                table: "CommunicationLevels");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "CommunicationLevels");

            migrationBuilder.DropColumn(
                name: "KiPrompt",
                table: "CommunicationLevels");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "CommunicationLevels",
                newName: "Level");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "CommunicationLevels",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "CommunicationLevels",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CommunicationLevels_PatientId",
                table: "CommunicationLevels",
                column: "PatientId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CommunicationLevels_Patients_PatientId",
                table: "CommunicationLevels",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
