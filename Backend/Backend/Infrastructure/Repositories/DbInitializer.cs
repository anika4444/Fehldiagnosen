using Backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public static class DbInitializer
    {
        public static async Task Initialize(MySqlDbContext context, RoleManager<IdentityRole> roleManager)
        {
            context.Database.EnsureCreated();

            string[] roleNames = { "Patient", "Arzt" };
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            if (!context.SymptomsDefinition.Any())
            {
                var definitions = GetInitialSymptomDefinitions();
                context.SymptomsDefinition.AddRange(definitions);
                await context.SaveChangesAsync();
            }

            var existingLevels = await context.CommunicationLevels.ToListAsync<CommunicationLevel>();

            if (existingLevels.Count < 3)
            {
                context.CommunicationLevels.AddRange(new List<CommunicationLevel>
                {
                    new CommunicationLevel {
                        Name = "L1",
                        Description = "Basic",
                        KiPrompt = "Explain everything in very simple terms...",
                        ActionRecommendation = "Use simple language..."
                    },
                    new CommunicationLevel { Name = "L2", Description = "Medium", KiPrompt = "Explain with moderate detail...", ActionRecommendation = "Use clear language..." },
                    new CommunicationLevel { Name = "L3", Description = "Advanced", KiPrompt = "Explain with technical detail...", ActionRecommendation = "Use precise language..." }
                });
                            await context.SaveChangesAsync();
                        }
        }
        private static List<SymptomDefinition> GetInitialSymptomDefinitions()
        {
            return new List<SymptomDefinition>
            {
                new SymptomDefinition {
                    Name = "Kopfschmerzen",
                    Aliases = new() { "Migräne", "Spannungskopfschmerz" },
                    Fields = new() {
                        new SymptomField { Name = "Art", Type = "select", Options = new() { "Pochend", "Stechend", "Drückend", "Dumpf" }, IsRequired = true },
                        new SymptomField { Name = "Ort", Type = "select", Options = new() { "Stirn", "Hinterkopf", "Einseitig links", "Einseitig rechts", "Schläfen" } },
                        new SymptomField { Name = "Begleiterscheinung", Type = "select", Options = new() { "Übelkeit", "Lichtempfindlichkeit", "Schwindel", "Keine" } }
                    }
                },

                new SymptomDefinition {
                    Name = "Fieber",
                    Aliases = new() { "Erhöhte Temperatur", "Schüttelfrost" },
                    Fields = new() {
                        new SymptomField { Name = "Temperatur in °C", Type = "number", IsRequired = true },
                        new SymptomField { Name = "Messort", Type = "select", Options = new() { "Ohr", "Stirn", "Oral", "Axillar" } },
                        new SymptomField { Name = "Schüttelfrost?", Type = "select", Options = new() { "Ja", "Nein" } }
                    }
                },

                new SymptomDefinition {
                    Name = "Husten",
                    Fields = new() {
                        new SymptomField { Name = "Typ", Type = "select", Options = new() { "Trocken / Reizhusten", "Produktiv (mit Auswurf)" }, IsRequired = true },
                        new SymptomField { Name = "Farbe des Auswurfs", Type = "select", Options = new() { "Klar", "Weißlich", "Gelb/Grün", "Blutig" } },
                        new SymptomField { Name = "Verschlimmerung", Type = "select", Options = new() { "Nachts", "Bei Belastung", "Kalte Luft" } }
                    }
                },

                new SymptomDefinition {
                    Name = "Rückenschmerzen",
                    Aliases = new() { "Hexenschuss", "Lumbago" },
                    Fields = new() {
                        new SymptomField { Name = "Bereich", Type = "select", Options = new() { "Halswirbelsäule", "Brustwirbelsäule", "Lendenwirbelsäule" }, IsRequired = true },
                        new SymptomField { Name = "Ausstrahlung", Type = "select", Options = new() { "In die Beine", "In die Arme", "Keine" } },
                        new SymptomField { Name = "Besserung durch", Type = "select", Options = new() { "Ruhe/Liegen", "Bewegung", "Wärme" } }
                    }
                },

                new SymptomDefinition {
                    Name = "Bauchschmerzen",
                    Aliases = new() { "Magenschmerzen", "Unterleibsschmerzen" },
                    Fields = new() {
                        new SymptomField { Name = "Region", Type = "select", Options = new() { "Oberbauch", "Mittler Bauch", "Unterbauch links", "Unterbauch rechts" }, IsRequired = true },
                        new SymptomField { Name = "Zustand", Type = "select", Options = new() { "Krampfartig", "Dauerschmerz", "Stechend" } },
                        new SymptomField { Name = "Letzter Stuhlgang", Type = "text", IsRequired = false }
                    }
                },

                new SymptomDefinition {
                    Name = "Müdigkeit",
                    Aliases = new() { "Erschöpfung", "Fatigue" },
                    Fields = new() {
                        new SymptomField { Name = "Zeitpunkt", Type = "select", Options = new() { "Morgens schlimmer", "Mittagstief", "Abends", "Den ganzen Tag" } },
                        new SymptomField { Name = "Schlafqualität", Type = "select", Options = new() { "Gut", "Unruhig", "Einschlafprobleme", "Durchschlafprobleme" } }
                    }
                },

                new SymptomDefinition {
                    Name = "Schwindel",
                    Aliases = new() { "Vertigo", "Benommenheit" },
                    Fields = new() {
                        new SymptomField { Name = "Form", Type = "select", Options = new() { "Drehschwindel", "Schwankschwindel", "Schwarzwerden vor Augen" }, IsRequired = true },
                        new SymptomField { Name = "Auslöser", Type = "select", Options = new() { "Aufstehen", "Kopfbewegung", "Stress", "Unbekannt" } }
                    }
                },

                new SymptomDefinition {
                    Name = "Halsschmerzen",
                    Fields = new() {
                        new SymptomField { Name = "Schluckbeschwerden?", Type = "select", Options = new() { "Ja", "Nein" } },
                        new SymptomField { Name = "Heiserkeit?", Type = "select", Options = new() { "Ja", "Nein" } },
                        new SymptomField { Name = "Mandeln geschwollen?", Type = "select", Options = new() { "Ja", "Nein", "Nicht sichtbar" } }
                    }
                },
                new SymptomDefinition {
                    Name = "Atemnot",
                    Aliases = new() { "Kurzatmigkeit", "Dyspnoe" },
                    Fields = new() {
                        new SymptomField { Name = "Auftreten", Type = "select", Options = new() { "In Ruhe", "Bei leichter Belastung", "Bei starker Belastung" }, IsRequired = true },
                        new SymptomField { Name = "Geräusche beim Atmen", Type = "select", Options = new() { "Pfeifen (Stridor)", "Rasseln", "Keine" } }
                    }
                },

                new SymptomDefinition {
                    Name = "Übelkeit",
                    Aliases = new() { "Brechreiz", "Flaues Gefühl" },
                    Fields = new() {
                        new SymptomField { Name = "Erbrechen?", Type = "select", Options = new() { "Ja", "Nein" } },
                        new SymptomField { Name = "Häufigkeit Erbrechen", Type = "number" },
                        new SymptomField { Name = "Zusammenhang mit Essen", Type = "text" }
                    }
                }
            };
        }
    }

}
