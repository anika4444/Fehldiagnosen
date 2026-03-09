using Backend.Domain.Entities;

namespace Backend.Infrastructure.Repositories
{
    public class DbInitializer
    {
        public static void Initialize(MySqlDbContext context)
        {
            context.Database.EnsureCreated();
            
            if(context.SymptomsDefinition.Any())
            {
                return;
            }

            var patients = new Patient[] {
                new Patient {
                    UserName = "jdoe",
                    FirstName = "John",
                    LastName = "Doe",
                    DateOfBirth = new DateTime(1990, 1, 1),},
                new Patient {
                    UserName = "asmith",
                    FirstName = "Alice",
                    LastName = "Smith",
                    DateOfBirth = new DateTime(1985, 5, 15),},
            };



            var symptoms = new SymptomDefinition[]
            {
                new SymptomDefinition
                {
                    Name = "Kopfschmerzen",
                    Aliases = new List<string> { "Migräne", "Schädelbrummen", "Kopfschmerz" },
                    Fields = new List<SymptomField>
                    {
                        new SymptomField
                        {
                            Name = "Art",
                            Type = "select",
                            Options = new List<string?> { "stechend", "dumpf", "pochend", "drückend" }
                        },
                        new SymptomField
                        {
                            Name = "Lokalisation",
                            Type = "select",
                            Options = new List<string?> { "Ganz Stirn", "Einseitig", "Beidseitig", "Hinterkopf" }
                        }
                    }
                },
                new SymptomDefinition
                {
                    Name = "Bauchschmerzen",
                    Aliases = new List<string> { "Bauchweh", "Magenschmerzen", "Magenkrämpfe" },
                    Fields = new List<SymptomField>
                    {
                        new SymptomField
                        {
                            Name = "Bereich",
                            Type = "select",
                            Options = new List<string?> { "Oberbauch", "Unterbauch", "Ganzflächig", "Bauchnabel" }
                        },
                        new SymptomField
                        {
                            Name = "Art",
                            Type = "select",
                            Options = new List<string?> { "krampfartig", "dumpf", "brennend" }
                        }
                    }
                },
                new SymptomDefinition
                {
                    Name = "Fieber",
                    Aliases = new List<string> { "Erhöhte Temperatur", "Glühen" },
                    Fields = new List<SymptomField>
                    {
                        new SymptomField
                        {
                            Name = "Gemessene Temperatur (°C)",
                            Type = "number",
                            Options = null // Bei Zahlen brauchen wir keine Optionen
                        },
                        new SymptomField
                        {
                            Name = "Schüttelfrost",
                            Type = "select",
                            Options = new List<string?> { "Ja", "Nein" }
                        }
                    }
                }
            };

            var patientSymptoms = new PatientSymptom[]
{
                new PatientSymptom
                {
                    Patient = patients[0],
                    SymptomDefinition = symptoms[0],
                    OccurrenceTime = DateTime.Now.AddDays(-1),
                    Details = new Dictionary<string, string?>
                    {
                        { "Art", "stechend" },
                        { "Lokalisation", "Einseitig" }
                    }
                },
                new PatientSymptom
                {
                    Patient = patients[1],
                    SymptomDefinition = symptoms[1],
                    OccurrenceTime = DateTime.Now.AddDays(-2),
                    Details = new Dictionary<string, string?>
                    {
                        { "Bereich", "Oberbauch" },
                        { "Art", "krampfartig" }
                    }
                }
};

            context.SymptomsDefinition.AddRange(symptoms);
            context.Patients.AddRange(patients);
            context.PatientSymptoms.AddRange(patientSymptoms);
            context.SaveChanges();
        }
    }
}
