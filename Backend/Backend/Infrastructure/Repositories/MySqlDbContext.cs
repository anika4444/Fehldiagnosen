using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlDbContext : DbContext
    {
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Medication> Medications { get; set; }
        public DbSet<SymptomDefinition> SymptomsDefinition { get; set; }
        public DbSet<PatientSymptom> PatientSymptoms { get; set; }
        public DbSet<FamilyHistoryEntry> FamilyHistoryEntries { get; set; }

        public MySqlDbContext(DbContextOptions<MySqlDbContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var jsonOptions = (JsonSerializerOptions?)null;

            // Konfiguration für Aliase in Symptome
            modelBuilder.Entity<SymptomDefinition>()
                .Property(s => s.Aliases)
                .HasColumnType("json") // sagt MySQL, dass es ein JSON-Datentyp ist
                .HasConversion(
                    v => JsonSerializer.Serialize(v, jsonOptions), // beim Speichern wird aus der C# Liste einen Text (JSON-String)
                    v => JsonSerializer.Deserialize<List<string>>(v, jsonOptions) ?? new List<string>() // beim Laden/Auslesen: mach aus dem Text eine echte C# Liste
                )
                .Metadata.SetValueComparer( // damit sagen wir ihm wie er merkt, dass ein neues Synonym hinzugefügt wurde
                    new ValueComparer<List<string>>(
                        (c1, c2) => c1!.SequenceEqual(c2!), // vergleicht ob beide Listen den exakt gleichen Inhalt haben
                        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())), // erstellt eine Prüfsumme (Hash). Ändert sich ein Wort, ändert sich der Hash
                        c => c.ToList() // macht eine Kopie der Liste, damit später verglichen werden kann
                    )
                );

            // Konfiguration für Fields in Symptome
            modelBuilder.Entity<SymptomDefinition>()
                .Property(s => s.Fields)
                .HasColumnType("json")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, jsonOptions),
                    v => JsonSerializer.Deserialize<List<SymptomField>>(v, jsonOptions) ?? new List<SymptomField>()
                )
                .Metadata.SetValueComparer(
                    new ValueComparer<List<SymptomField>>(
                        (c1, c2) => JsonSerializer.Serialize(c1, jsonOptions) == JsonSerializer.Serialize(c2, jsonOptions), // mach aus beiden Listen einen Text und schau ob die Texte gleich sind
                        c => JsonSerializer.Serialize(c, jsonOptions).GetHashCode(),
                        c => JsonSerializer.Deserialize<List<SymptomField>>(JsonSerializer.Serialize(c, jsonOptions), jsonOptions)! // lade den Text wieder in eine Liste, um eine saubere Kopie im Speicher zu haben
                ));

            // Konfiguration für Details im Symptomeintrag
            modelBuilder.Entity<PatientSymptom>()
                .Property(e => e.Details)
                .HasColumnType("json")
                .HasConversion(
                    v => JsonSerializer.Serialize(v, jsonOptions),
                    v => JsonSerializer.Deserialize<Dictionary<string, string?>>(v, jsonOptions) ?? new Dictionary<string, string?>()
                )
                .Metadata.SetValueComparer(
                    new ValueComparer<Dictionary<string, string?>>(
                        (c1, c2) => c1!.Count == c2!.Count && !c1.Except(c2).Any(), // zählt die Einträge und schaut, ob es Unterschiede gibt
                        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.Key.GetHashCode(), v.Value.GetHashCode())), // berechnet den Hash aus jedem Schlüsselwort und der Antwort
                        c => c.ToDictionary(k => k.Key, v => v.Value) // erstellt ein komplett neues Dictionary als Sicherheitskopie
                ));

            // Metadata: das ist eine Art verstecktes Feld, das Entity Framework nutzt, um zu wissen, ob sich die Daten geändert haben.
            // Da wir komplexe Strukturen wie Listen und Dictionaries haben, müssen wir ihm sagen, wie er diese vergleichen soll.
            // Ansonsten könnte es passieren, dass er denkt, dass sich nichts geändert hat, obwohl wir z.B. ein neues Synonym hinzugefügt haben,
            // weil er die Referenz der Liste nicht ändert, sondern nur den Inhalt.
            // Mit diesen ValueComparer sagen wir ihm, wie er die Inhalte vergleichen soll, damit er merkt, wenn sich etwas geändert hat.
        }
    }
}
