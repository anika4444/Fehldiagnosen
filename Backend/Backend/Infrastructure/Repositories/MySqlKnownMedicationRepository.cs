using Backend.Application.Repositories;
using Backend.Domain.Entities;
using Backend.Domain.Entities.Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlKnownMedicationRepository : IKnownMedicationRepository
    {
        private readonly MySqlDbContext _context;

        public MySqlKnownMedicationRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<KnownMedication>> SearchAsync(string query)
        {
            return await _context.KnownMedications
                .Where(m => m.Name.Contains(query))
                .Take(10)
                .ToListAsync();
        }

        public async Task RebuildFromCsvAsync(string csvPath)
        {
            _context.KnownMedications.RemoveRange(_context.KnownMedications);
            await _context.SaveChangesAsync();

            var lines = await File.ReadAllLinesAsync(csvPath, System.Text.Encoding.UTF8);
            var medications = new List<KnownMedication>();

            foreach (var line in lines.Skip(1))
            {
                var cols = line.Split(';');
                if(cols.Length < 25) continue;

                var name = cols[2].Trim('"').Trim();
                if(string.IsNullOrWhiteSpace(name)) continue;

                medications.Add(new KnownMedication
                {
                    Name = name,
                    Substance = cols[7].Trim('"').Trim(),
                    AtcCode = cols[8].Trim('"').Trim(),
                    Dosage = cols[19].Trim('"').Trim(),
                    PrescriptionRequired = cols[24].Trim('"').Trim(),
                });
            }

            await _context.KnownMedications.AddRangeAsync(medications);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<KnownMedication>> IdentifyAsync(string? brand,string? productName, string? activeIngredient, string? dosage, string? form)
        {
            /*var brandLower = brand?.Trim().ToLowerInvariant() ?? string.Empty;
            var activeIngredientLower = activeIngredient?.Trim().ToLowerInvariant() ?? string.Empty;

            if (string.IsNullOrWhiteSpace(brandLower) && string.IsNullOrWhiteSpace(activeIngredientLower))
            {
                Console.WriteLine("[Repository] Kein Brand und kein Wirkstoff → kein Match möglich");
                return Enumerable.Empty<KnownMedication>();
            }

            List<KnownMedication> candidates;

            if (!string.IsNullOrWhiteSpace(brandLower) && !string.IsNullOrWhiteSpace(activeIngredientLower))
            {
                candidates = await _context.KnownMedications
                    .Where(m => m.Name.ToLower().Contains(brandLower) ||
                                m.Substance.ToLower().Contains(activeIngredientLower))
                    .Take(200)
                    .ToListAsync();
            }
            else if (!string.IsNullOrWhiteSpace(brandLower))
            {
                candidates = await _context.KnownMedications
                    .Where(m => m.Name.ToLower().Contains(brandLower))
                    .Take(200)
                    .ToListAsync();
            }
            else
            {
                candidates = await _context.KnownMedications
                    .Where(m => m.Substance.ToLower().Contains(activeIngredientLower))
                    .Take(200)
                    .ToListAsync();
            }*/

            var brandLower = brand?.Trim().ToLowerInvariant() ?? string.Empty;
            var brandNoSpace = brandLower.Replace(" ", "");
            var activeIngredientLower = activeIngredient?.Trim().ToLowerInvariant() ?? string.Empty;

            if (string.IsNullOrWhiteSpace(brandLower) && string.IsNullOrWhiteSpace(activeIngredientLower))
            {
                Console.WriteLine("[Repository] Kein Brand und kein Wirkstoff → kein Match möglich");
                return Enumerable.Empty<KnownMedication>();
            }

            List<KnownMedication> candidates;

            // Erstes Wort des Brands als Anker (robuster gegen Leerzeichen-Unterschiede)
            var brandFirstWord = brandLower.Split(' ')[0];

            if (!string.IsNullOrWhiteSpace(brandLower) && !string.IsNullOrWhiteSpace(activeIngredientLower))
            {
                candidates = await _context.KnownMedications
                    .Where(m => m.Name.ToLower().Contains(brandFirstWord) ||
                                m.Substance.ToLower().Contains(activeIngredientLower))
                    .Take(200)
                    .ToListAsync();
            }
            else if (!string.IsNullOrWhiteSpace(brandLower))
            {
                candidates = await _context.KnownMedications
                    .Where(m => m.Name.ToLower().Contains(brandFirstWord))
                    .Take(200)
                    .ToListAsync();
            }
            else
            {
                candidates = await _context.KnownMedications
                    .Where(m => m.Substance.ToLower().Contains(activeIngredientLower))
                    .Take(200)
                    .ToListAsync();
            }

            Console.WriteLine($"[Repository] Kandidaten nach Vorfilter: {candidates.Count}");

            if (!candidates.Any())
                return Enumerable.Empty<KnownMedication>();

            var scored = candidates
                .Select(m => new
                {
                    Medication = m,
                    Score = CalculateStructuredScore(m, brand, productName, activeIngredient, dosage, form)
                })
                .Where(x => x.Score > 0)
                .OrderByDescending(x => x.Score)
                .ToList();

            Console.WriteLine($"[Repository] Nach Scoring: {scored.Count} Treffer");
            foreach (var s in scored.Take(3))
                Console.WriteLine($"  → {s.Medication.Name} | Score={s.Score}");

            if (!scored.Any())
                return Enumerable.Empty<KnownMedication>();

            var best = scored.First();

            if (best.Score < 3)
            {
                Console.WriteLine($"[Repository] Score zu niedrig ({best.Score}) → kein Treffer");
                return Enumerable.Empty<KnownMedication>();
            }

            if (scored.Count > 1 && scored[1].Score >= best.Score)
            {
                var topCandidates = scored.Where(x => x.Score == best.Score).ToList();
                Console.WriteLine($"[Repository] Gleichstand bei {topCandidates.Count} Kandidaten, starte Tiebreaker...");

                var dosageLower = dosage?.ToLowerInvariant() ?? "";
                var formLower = form?.ToLowerInvariant() ?? "";

                // Exakter Match: Dosage UND Form im DB-Namen
                var exactMatch = topCandidates.FirstOrDefault(x =>
                    (!string.IsNullOrWhiteSpace(dosageLower) && x.Medication.Name.ToLowerInvariant().Contains(dosageLower)) &&
                    (!string.IsNullOrWhiteSpace(formLower) && x.Medication.Name.ToLowerInvariant().Contains(formLower)));

                if (exactMatch != null)
                {
                    Console.WriteLine($"[Repository] Tiebreaker Treffer (Dosage+Form): {exactMatch.Medication.Name}");
                    return new[] { exactMatch.Medication };
                }

                // Nur Dosage passt
                var dosageMatch = topCandidates.FirstOrDefault(x =>
                    !string.IsNullOrWhiteSpace(dosageLower) &&
                    x.Medication.Name.ToLowerInvariant().Contains(dosageLower));

                if (dosageMatch != null)
                {
                    Console.WriteLine($"[Repository] Tiebreaker Treffer (nur Dosage): {dosageMatch.Medication.Name}");
                    return new[] { dosageMatch.Medication };
                }

                Console.WriteLine($"[Repository] Tiebreaker erfolglos → kein sicherer Treffer");
                return Enumerable.Empty<KnownMedication>();
            }

            Console.WriteLine($"[Repository] Bester Treffer: {best.Medication.Name} | Score={best.Score}");
            return new[] { best.Medication };
        }

        /*private static int CalculateStructuredScore(
            KnownMedication m,
            string? brand,
            string? productName,
            string? activeIngredient,
            string? dosage,
            string? form)
        {
            int score = 0;
            var name = m.Name?.ToLowerInvariant() ?? "";
            var substance = m.Substance?.ToLowerInvariant() ?? "";
            var dbDosage = m.Dosage?.ToLowerInvariant() ?? "";

            if (!string.IsNullOrWhiteSpace(brand))
            {
                var b = brand.ToLowerInvariant();
                if (name.Contains(b) || b.Contains(name.Split(' ')[0]))
                    score += 5;
            }

            if (!string.IsNullOrWhiteSpace(productName))
            {
                var p = productName.ToLowerInvariant();
                if (name.Contains(p))
                    score += 2;
            }

            if (!string.IsNullOrWhiteSpace(activeIngredient))
            {
                var ingredients = activeIngredient
                    .ToLowerInvariant()
                    .Split(new[] { ',', '+', '/' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(i => i.Trim())
                    .Where(i => i.Length > 2);

                foreach (var ing in ingredients)
                {
                    if (substance.Contains(ing))
                        score += 3;
                }
            }

            if (!string.IsNullOrWhiteSpace(dosage))
            {
                var d = dosage.ToLowerInvariant();
                if (dbDosage.Contains(d) || name.Contains(d))
                    score += 2;
            }

            if (!string.IsNullOrWhiteSpace(form))
            {
                var f = form.ToLowerInvariant();
                var formVariants = f.Contains("filmtabletten")
                    ? new[] { f, "tabletten" }
                    : f.Contains("tabletten") && !f.Contains("film")
                        ? new[] { f, "filmtabletten" }
                        : new[] { f };

                if (formVariants.Any(fv => name.Contains(fv)))
                    score += 1;
            }

            return score;
        }*/

        private static int CalculateStructuredScore(
    KnownMedication m,
    string? brand,
    string? productName,
    string? activeIngredient,
    string? dosage,
    string? form)
        {
            int score = 0;
            var name = m.Name?.ToLowerInvariant() ?? "";
            var substance = m.Substance?.ToLowerInvariant() ?? "";
            var dbDosage = m.Dosage?.ToLowerInvariant() ?? "";

            if (!string.IsNullOrWhiteSpace(brand))
            {
                var b = brand.ToLowerInvariant();
                var bNoSpace = b.Replace(" ", "");
                var nameNoSpace = name.Replace(" ", "").Replace("-", "");

                // normaler Match
                if (name.Contains(b))
                    score += 5;
                // Match ohne Leerzeichen (Broncho Stop → bronchostop)
                else if (nameNoSpace.Contains(bNoSpace) || bNoSpace.Contains(nameNoSpace.Split(' ')[0].Replace(" ", "")))
                    score += 5;
                // erstes Wort des Brands im Namen (Broncho → BRONCHOSTOP)
                else if (name.Contains(b.Split(' ')[0]) && b.Split(' ')[0].Length > 3)
                    score += 3;
            }

            if (!string.IsNullOrWhiteSpace(productName))
            {
                var p = productName.ToLowerInvariant();
                if (name.Contains(p))
                    score += 2;
            }

            if (!string.IsNullOrWhiteSpace(activeIngredient))
            {
                // KI-Wirkstoff aufteilen (Komma, Plus, Slash)
                var ingredients = activeIngredient
                    .ToLowerInvariant()
                    .Split(new[] { ',', '+', '/' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(i => i.Trim())
                    .Where(i => i.Length > 3)
                    .ToList();

                foreach (var ing in ingredients)
                {
                    // Direkter Match (deutsch→deutsch oder latein→latein)
                    if (substance.Contains(ing))
                    {
                        score += 3;
                        continue;
                    }

                    // Stamm-Match: erste 5 Zeichen vergleichen
                    // "thymian..." → trifft "thymi herba"
                    // "eibisch..." → trifft "althaea" nicht direkt, aber Teilwort-Check hilft
                    var stem = ing.Length >= 5 ? ing.Substring(0, 5) : ing;
                    if (substance.Contains(stem))
                    {
                        score += 2;
                        continue;
                    }

                    // Substanz-Wörter gegen Ingredient prüfen (latein→deutsch)
                    // "thymi herba" → "thymi" in "thymiantrockenextrakt"
                    var substanceWords = substance
                        .Split(new[] { ' ', ',', '(', ')' }, StringSplitOptions.RemoveEmptyEntries)
                        .Where(w => w.Length > 3);

                    foreach (var sw in substanceWords)
                    {
                        if (ing.Contains(sw) || sw.Contains(ing.Length >= 5 ? ing.Substring(0, 5) : ing))
                        {
                            score += 2;
                            break;
                        }
                    }
                }
            }

            if (!string.IsNullOrWhiteSpace(dosage))
            {
                var d = dosage.ToLowerInvariant();
                if (dbDosage.Contains(d) || name.Contains(d))
                    score += 2;
            }

            if (!string.IsNullOrWhiteSpace(form))
            {
                var f = form.ToLowerInvariant();
                var formVariants = f.Contains("filmtabletten")
                    ? new[] { f, "tabletten" }
                    : f.Contains("tabletten") && !f.Contains("film")
                        ? new[] { f, "filmtabletten" }
                        : new[] { f };

                if (formVariants.Any(fv => name.Contains(fv)))
                    score += 1;
            }

            return score;
        }
    }
}