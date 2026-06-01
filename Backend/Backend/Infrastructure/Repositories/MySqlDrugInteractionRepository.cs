using Backend.Application.Repositories;
using Backend.Domain.Entities;
using EFCore.BulkExtensions;
using GTranslate.Translators;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Xml;
using System.Xml.Linq;

namespace Backend.Infrastructure.Repositories
{
    public class MySqlDrugInteractionRepository : IDrugInteractionRepository
    {
        private readonly MySqlDbContext _context;
        private readonly AggregateTranslator _translator = new AggregateTranslator();

        public MySqlDrugInteractionRepository(MySqlDbContext context)
        {
            _context = context;
        }

        public async Task<string?> GetDrugBankIdByAtcCodeAsync(string atcCode)
        {
            return await _context.AtcDrugMappings
                .Where(m => m.AtcCode == atcCode)
                .Select(m => m.DrugBankId)
                .FirstOrDefaultAsync();
        }

        public async Task<List<string>> GetDrugBankIdsByAtcCodesAsync(List<string> atcCode)
        {
            if (atcCode == null || !atcCode.Any())
            {
                return new List<string>();
            }

            var drugBankIds = new List<string>();
            var connectionString = _context.Database.GetConnectionString()!;

            await using var conn = new MySqlConnection(connectionString);
            await conn.OpenAsync();

            var sb = new System.Text.StringBuilder("SELECT DISTINCT DrugBankId FROM AtcDrugMappings WHERE AtcCode IN (");
            var parameters = new List<MySqlParameter>();

            for (int i = 0; i < atcCode.Count; i++)
            {
                sb.Append(i == 0 ? "" : ",");
                sb.Append($"@p{i}");
                parameters.Add(new MySqlParameter($"@p{i}", atcCode[i]));
            }
            sb.Append(")");

            await using var cmd = new MySqlCommand(sb.ToString(), conn);
            cmd.Parameters.AddRange(parameters.ToArray());

            await using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                drugBankIds.Add(reader.GetString(0));
            }

            return drugBankIds;
        }

        public async Task<List<DrugInteraction>> GetInteractionsAsync(string newDrugBankId, List<string> existingDrugBankIds)
        {
            if (existingDrugBankIds == null || !existingDrugBankIds.Any())
            {
                return new List<DrugInteraction>();
            }

            var interactions = new List<DrugInteraction>();
            var connectionString = _context.Database.GetConnectionString()!;

            await using var conn = new MySqlConnection(connectionString);
            await conn.OpenAsync();

            var inClauseBuilder = new System.Text.StringBuilder("(");
            var parameters = new List<MySqlParameter>
            {
                new MySqlParameter("@newId", newDrugBankId)
            };

            for (int i = 0; i < existingDrugBankIds.Count; i++)
            {
                inClauseBuilder.Append(i == 0 ? "" : ",");
                inClauseBuilder.Append($"@p{i}");
                parameters.Add(new MySqlParameter($"@p{i}", existingDrugBankIds[i]));
            }
            inClauseBuilder.Append(")");

            var inClause = inClauseBuilder.ToString();

            var sql = $@"
                SELECT Id, SourceDrugBankId, TargetDrugBankId, TargetName, Description 
                FROM DrugInteractions 
                WHERE (SourceDrugBankId = @newId AND TargetDrugBankId IN {inClause}) 
                   OR (SourceDrugBankId IN {inClause} AND TargetDrugBankId = @newId)";

            await using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddRange(parameters.ToArray());

            await using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                interactions.Add(new DrugInteraction
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    SourceDrugBankId = reader.GetString(reader.GetOrdinal("SourceDrugBankId")),
                    TargetDrugBankId = reader.GetString(reader.GetOrdinal("TargetDrugBankId")),

                    TargetName = reader.IsDBNull(reader.GetOrdinal("TargetName"))
                                 ? string.Empty
                                 : reader.GetString(reader.GetOrdinal("TargetName")),

                    Description = reader.IsDBNull(reader.GetOrdinal("Description"))
                                  ? string.Empty
                                  : reader.GetString(reader.GetOrdinal("Description"))
                });
            }

            return interactions;
        }

        public async Task RebuildFromXmlAsync(string xmlPath)
        {
            var connectionString = _context.Database.GetConnectionString()!;
            _context.ChangeTracker.AutoDetectChangesEnabled = false;

            try
            {
                await using var transaction = await _context.Database.BeginTransactionAsync();

                try
                {
                
                    await using var conn = new MySqlConnection(connectionString);
                    await conn.OpenAsync();

                    var truncateSql = @"SET FOREIGN_KEY_CHECKS = 0;
                        TRUNCATE TABLE AtcDrugMappings;
                        TRUNCATE TABLE DrugInteractions;
                        SET FOREIGN_KEY_CHECKS = 1;";

                    await using var cmd = new MySqlCommand(truncateSql, conn);
                    await cmd.ExecuteNonQueryAsync();
                    _context.ChangeTracker.Clear();

                    var processedInteractions = new HashSet<string>();
                    var mappingsBatch = new List<AtcDrugMapping>();
                    var interactionsBatch = new List<DrugInteraction>();
                    const int batchSize = 15000;

                    using var reader = XmlReader.Create(xmlPath);
                    reader.MoveToContent();

                    while (reader.Read())
                    {
                        if (reader.NodeType == XmlNodeType.Element && reader.Name == "drug")
                        {
                            using var drugReader = reader.ReadSubtree();
                            var drugXml = XElement.Load(drugReader);
                            var ns = drugXml.Name.Namespace;

                            var primaryId = drugXml
                                .Elements(ns + "drugbank-id")
                                .FirstOrDefault(e => (string?)e.Attribute("primary") == "true")?.Value;

                            var drugName = drugXml.Element(ns + "name")?.Value;

                            if (string.IsNullOrEmpty(primaryId)) continue;

                            foreach (var atc in drugXml.Descendants(ns + "atc-code"))
                            {
                                var code = atc.Attribute("code")?.Value;
                                if (!string.IsNullOrEmpty(code))
                                {
                                    mappingsBatch.Add(new AtcDrugMapping
                                    {
                                        AtcCode = code,
                                        DrugBankId = primaryId,
                                        DrugName = drugName ?? "Unbekannt"
                                    });
                                }
                            }

                            foreach (var inter in drugXml.Descendants(ns + "drug-interaction"))
                            {
                                var targetId = inter.Element(ns + "drugbank-id")?.Value;
                                if (!string.IsNullOrEmpty(targetId))
                                {
                                    var key = string.Compare(primaryId, targetId) < 0
                                        ? $"{primaryId}_{targetId}"
                                        : $"{targetId}_{primaryId}";

                                    if (processedInteractions.Add(key))
                                    {
                                        interactionsBatch.Add(new DrugInteraction
                                        {
                                            SourceDrugBankId = primaryId,
                                            TargetDrugBankId = targetId,
                                            TargetName = inter.Element(ns + "name")?.Value ?? "Unbekannt",
                                            Description = inter.Element(ns + "description")?.Value ?? ""
                                        });
                                    }
                                }
                            }

                            if (mappingsBatch.Count >= batchSize)
                                await FlushMappingsAsync(connectionString, mappingsBatch);

                            if (interactionsBatch.Count >= batchSize)
                                await FlushInteractionsAsync(connectionString, interactionsBatch);
                        }
                    }

                    await FlushMappingsAsync(connectionString,mappingsBatch);
                    await FlushInteractionsAsync(connectionString,interactionsBatch);

                    processedInteractions.Clear();

                    await transaction.CommitAsync();
                }
                catch
                {
                    await transaction.RollbackAsync();
                    throw;
                }
            }
            finally
            {
                // Immer zurücksetzen, egal ob Fehler oder nicht
                _context.ChangeTracker.AutoDetectChangesEnabled = true;
            }
        }
        private static async Task FlushMappingsAsync(string connectionString, List<AtcDrugMapping> mappings)
        {
            if (!mappings.Any()) return;

            await using var conn = new MySqlConnection(connectionString);
            await conn.OpenAsync();

            const int chunkSize = 1000;
            for (int i = 0; i < mappings.Count; i += chunkSize)
            {
                var chunk = mappings.Skip(i).Take(chunkSize).ToList();
                var values = string.Join(",", chunk.Select(_ => "(@ac,@di,@dn)".Replace("ac", $"ac{i}").Replace("di", $"di{i}").Replace("dn", $"dn{i}")));

                // Einfacher mit StringBuilder:
                var sb = new System.Text.StringBuilder("INSERT INTO AtcDrugMappings (AtcCode, DrugBankId, DrugName) VALUES ");
                var parameters = new List<MySqlParameter>();

                for (int j = 0; j < chunk.Count; j++)
                {
                    sb.Append(j == 0 ? "" : ",");
                    sb.Append($"(@ac{j},@di{j},@dn{j})");
                    parameters.Add(new MySqlParameter($"@ac{j}", chunk[j].AtcCode));
                    parameters.Add(new MySqlParameter($"@di{j}", chunk[j].DrugBankId));
                    parameters.Add(new MySqlParameter($"@dn{j}", chunk[j].DrugName));
                }

                await using var cmd = new MySqlCommand(sb.ToString(), conn);
                cmd.Parameters.AddRange(parameters.ToArray());
                await cmd.ExecuteNonQueryAsync();
            }

            mappings.Clear();
        }

        private static async Task FlushInteractionsAsync(string connectionString, List<DrugInteraction> interactions)
        {
            if (!interactions.Any()) return;

            await using var conn = new MySqlConnection(connectionString);
            await conn.OpenAsync();

            const int chunkSize = 1000;
            for (int i = 0; i < interactions.Count; i += chunkSize)
            {
                var chunk = interactions.Skip(i).Take(chunkSize).ToList();

                var sb = new System.Text.StringBuilder("INSERT INTO DrugInteractions (SourceDrugBankId, TargetDrugBankId, TargetName, Description) VALUES ");
                var parameters = new List<MySqlParameter>();

                for (int j = 0; j < chunk.Count; j++)
                {
                    sb.Append(j == 0 ? "" : ",");
                    sb.Append($"(@s{j},@t{j},@tn{j},@d{j})");
                    parameters.Add(new MySqlParameter($"@s{j}", chunk[j].SourceDrugBankId));
                    parameters.Add(new MySqlParameter($"@t{j}", chunk[j].TargetDrugBankId));
                    parameters.Add(new MySqlParameter($"@tn{j}", chunk[j].TargetName));
                    parameters.Add(new MySqlParameter($"@d{j}", chunk[j].Description));
                }

                await using var cmd = new MySqlCommand(sb.ToString(), conn);
                cmd.Parameters.AddRange(parameters.ToArray());
                await cmd.ExecuteNonQueryAsync();
            }

            interactions.Clear();
        }
    }
}