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
        public async Task<IEnumerable<KnownMedication>> IdentifyAsync(string? brand, string? productName, string? activeIngredient, string? dosage, string? form)
        {
            var brandLower = brand?.Trim().ToLowerInvariant() ?? string.Empty;
            var brandFirstWord = brandLower.Split(' ')[0];
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
                    .Where(medication => medication.Name.ToLower().Contains(brandFirstWord) ||
                                         medication.Substance.ToLower().Contains(activeIngredientLower))
                    .Take(200)
                    .ToListAsync();
            }
            else if (!string.IsNullOrWhiteSpace(brandLower))
            {
                candidates = await _context.KnownMedications
                    .Where(medication => medication.Name.ToLower().Contains(brandFirstWord))
                    .Take(200)
                    .ToListAsync();
            }
            else
            {
                candidates = await _context.KnownMedications
                    .Where(medication => medication.Substance.ToLower().Contains(activeIngredientLower))
                    .Take(200)
                    .ToListAsync();
            }

            Console.WriteLine($"[Repository] Kandidaten nach Vorfilter: {candidates.Count}");

            if (!candidates.Any())
            {
                return Enumerable.Empty<KnownMedication>();
            }

            var scored = candidates
                .Select(medication => new
                {
                    Medication = medication,
                    Score = CalculateStructuredScore(medication, brand, productName, activeIngredient, dosage, form)
                })
                .Where(entry => entry.Score > 0)
                .OrderByDescending(entry => entry.Score)
                .ToList();

            Console.WriteLine($"[Repository] Nach Scoring: {scored.Count} Treffer");
            foreach (var entry in scored.Take(3))
            {
                Console.WriteLine($"  → {entry.Medication.Name} | Score={entry.Score}");
            }

            if (!scored.Any())
            {
                return Enumerable.Empty<KnownMedication>();
            }

            var best = scored.First();

            if (best.Score < 3)
            {
                Console.WriteLine($"[Repository] Score zu niedrig ({best.Score}) → kein Treffer");
                return Enumerable.Empty<KnownMedication>();
            }

            if (scored.Count > 1 && scored[1].Score >= best.Score)
            {
                var topCandidates = scored.Where(entry => entry.Score == best.Score).ToList();
                Console.WriteLine($"[Repository] Gleichstand bei {topCandidates.Count} Kandidaten, starte Tiebreaker...");

                var dosageLower = dosage?.ToLowerInvariant() ?? "";
                var formLower = form?.ToLowerInvariant() ?? "";
                var productNameLower = productName?.ToLowerInvariant() ?? "";

                // Tiebreaker 1: Dosage UND Form im DB-Namen
                var exactMatch = topCandidates.FirstOrDefault(entry =>
                    !string.IsNullOrWhiteSpace(dosageLower) &&
                    entry.Medication.Name.ToLowerInvariant().Contains(dosageLower) &&
                    !string.IsNullOrWhiteSpace(formLower) &&
                    entry.Medication.Name.ToLowerInvariant().Contains(formLower));

                if (exactMatch != null)
                {
                    Console.WriteLine($"[Repository] Tiebreaker Treffer (Dosage+Form): {exactMatch.Medication.Name}");
                    return new[] { exactMatch.Medication };
                }

                // Tiebreaker 2: ProductName-Wörter im DB-Namen
                if (!string.IsNullOrWhiteSpace(productNameLower))
                {
                    var productWords = productNameLower
                        .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                        .Where(word => word.Length > 2)
                        .ToList();

                    var productMatch = topCandidates
                        .Select(entry => new
                        {
                            entry.Medication,
                            entry.Score,
                            ProductWordMatches = productWords.Count(word =>
                                entry.Medication.Name.ToLowerInvariant().Contains(word))
                        })
                        .Where(entry => entry.ProductWordMatches > 0)
                        .OrderByDescending(entry => entry.ProductWordMatches)
                        .FirstOrDefault();

                    if (productMatch != null)
                    {
                        var secondBestMatches = topCandidates
                            .Where(entry => entry.Medication.Name != productMatch.Medication.Name)
                            .Select(entry => productWords.Count(word =>
                                entry.Medication.Name.ToLowerInvariant().Contains(word)))
                            .DefaultIfEmpty(0)
                            .Max();

                        if (productMatch.ProductWordMatches > secondBestMatches)
                        {
                            Console.WriteLine($"[Repository] Tiebreaker Treffer (ProductName): {productMatch.Medication.Name}");
                            return new[] { productMatch.Medication };
                        }
                    }
                }

                // Tiebreaker 3: Nur Dosage
                var dosageMatch = topCandidates.FirstOrDefault(entry =>
                    !string.IsNullOrWhiteSpace(dosageLower) &&
                    entry.Medication.Name.ToLowerInvariant().Contains(dosageLower));

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

        private static int CalculateStructuredScore(KnownMedication m, string? brand, string? productName, string? activeIngredient, string? dosage, string? form)
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