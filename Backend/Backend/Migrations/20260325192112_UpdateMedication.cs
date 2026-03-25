using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMedication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Dosage",
                table: "Medications",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DurationInDays",
                table: "Medications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EntryBy",
                table: "Medications",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Indication",
                table: "Medications",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IntakeFrequency",
                table: "Medications",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "IntakeStartDate",
                table: "Medications",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dosage",
                table: "Medications");

            migrationBuilder.DropColumn(
                name: "DurationInDays",
                table: "Medications");

            migrationBuilder.DropColumn(
                name: "EntryBy",
                table: "Medications");

            migrationBuilder.DropColumn(
                name: "Indication",
                table: "Medications");

            migrationBuilder.DropColumn(
                name: "IntakeFrequency",
                table: "Medications");

            migrationBuilder.DropColumn(
                name: "IntakeStartDate",
                table: "Medications");
        }
    }
}
