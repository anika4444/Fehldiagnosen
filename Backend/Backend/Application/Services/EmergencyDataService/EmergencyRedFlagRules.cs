using Backend.Application.Services.EmergencyDataService.Dto;

namespace Backend.Application.Services.EmergencyDataService
{
    // Fixed, explainable rules. Kept out of the AI on purpose so the warnings are always reproducible.
    public static class EmergencyRedFlagRules
    {
        private record AtcRule(string Prefix, string Title, string Text);
        private record IcdRule(string Prefix, string Title, string Text);

        // ATC prefixes of drug groups that matter in an emergency
        private static readonly AtcRule[] MedicationRules =
        [
            new("B01A", "Gerinnungshemmer", "Erhöhtes Blutungsrisiko."),
            new("A10A", "Insulin", "Unterzuckerung möglich, Blutzucker prüfen."),
            new("A10B", "Blutzuckersenker", "Unterzuckerung möglich, Blutzucker prüfen."),
            new("N03A", "Antiepileptikum", "Anfallsleiden, Einnahme nicht unterbrechen."),
            new("N02A", "Opioid", "Atemdepression möglich."),
            new("H02A", "Kortison", "Gefahr einer Nebennierenkrise bei plötzlichem Absetzen."),
            new("C01A", "Herzglykosid", "Herzrhythmus und Elektrolyte beachten."),
            new("C07", "Betablocker", "Langsamer Puls und niedriger Blutdruck möglich."),
            new("L04", "Immunsuppressivum", "Erhöhte Infektanfälligkeit."),
            new("L01", "Krebstherapie", "Erhöhte Infektanfälligkeit und Blutungsneigung möglich.")
        ];

        // ICD-10 prefixes of chronic conditions that change emergency treatment
        private static readonly IcdRule[] ConditionRules =
        [
            new("E10", "Diabetes", "Typ 1 Diabetes bekannt."),
            new("E11", "Diabetes", "Typ 2 Diabetes bekannt."),
            new("G40", "Epilepsie", "Anfallsleiden bekannt."),
            new("I48", "Vorhofflimmern", "Herzrhythmusstörung bekannt."),
            new("I50", "Herzinsuffizienz", "Herzschwäche bekannt."),
            new("J45", "Asthma", "Asthma bekannt."),
            new("N18", "Niereninsuffizienz", "Nierenfunktion eingeschränkt, Dosierungen prüfen.")
        ];

        private const int SevereSymptomIntensity = 8;
        private static readonly TimeSpan SevereSymptomWindow = TimeSpan.FromHours(72);

        public static List<EmergencyRedFlagDto> Evaluate(
            IEnumerable<EmergencyMedicationDto> currentMedications,
            IEnumerable<EmergencyConditionDto> chronicConditions,
            IEnumerable<EmergencySymptomDto> recentSymptoms,
            DateTime now)
        {
            var flags = new List<EmergencyRedFlagDto>();

            foreach (var rule in MedicationRules)
            {
                var matches = currentMedications
                    .Where(m => !string.IsNullOrWhiteSpace(m.AtcCode)
                        && m.AtcCode!.StartsWith(rule.Prefix, StringComparison.OrdinalIgnoreCase))
                    .Select(m => m.Name)
                    .Distinct()
                    .ToList();

                if (matches.Count == 0) continue;

                flags.Add(new EmergencyRedFlagDto
                {
                    Title = rule.Title,
                    Text = $"{string.Join(", ", matches)}. {rule.Text}",
                    Source = "Medication"
                });
            }

            foreach (var rule in ConditionRules)
            {
                var match = chronicConditions.FirstOrDefault(c => !string.IsNullOrWhiteSpace(c.IcdCode)
                    && c.IcdCode!.StartsWith(rule.Prefix, StringComparison.OrdinalIgnoreCase));

                // Skip when a medication rule already raised the same topic
                if (match == null || flags.Any(f => f.Title == rule.Title)) continue;

                flags.Add(new EmergencyRedFlagDto
                {
                    Title = rule.Title,
                    Text = rule.Text,
                    Source = "Condition"
                });
            }

            var severe = recentSymptoms
                .Where(s => s.Intensity >= SevereSymptomIntensity && now - s.OccurredAt <= SevereSymptomWindow)
                .OrderByDescending(s => s.Intensity)
                .ToList();

            foreach (var symptom in severe.GroupBy(s => s.Name).Select(g => g.First()))
            {
                flags.Add(new EmergencyRedFlagDto
                {
                    Title = $"Starke Beschwerden: {symptom.Name}",
                    Text = $"Stärke {symptom.Intensity} von 10 in den letzten 72 Stunden.",
                    Source = "Symptom"
                });
            }

            return flags;
        }
    }
}
