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
                if (cols.Length < 25) continue;

                var name = cols[2].Trim('"').Trim();
                if (string.IsNullOrWhiteSpace(name)) continue;

                medications.Add(new KnownMedication
                {
                    Name = name,
                    Wirkstoff = cols[7].Trim('"').Trim(),
                    AtcCode = cols[8].Trim('"').Trim(),
                    Staerke = cols[19].Trim('"').Trim(),
                    Darreichungsform = cols[21].Trim('"').Trim(),
                    Rezeptpflichtig = cols[24].Trim('"').Trim(),
                });
            }

            await _context.KnownMedications.AddRangeAsync(medications);
            await _context.SaveChangesAsync();
        }
    }
}