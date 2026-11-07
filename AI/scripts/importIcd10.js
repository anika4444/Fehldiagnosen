/**
 * ICD-10-GM ClaML/XML → knowledge/*.md Importer
 *
 * Verwendung:
 *   node scripts/importIcd10.js scripts/icd10gm2026syst_claml.xml
 *
 * Optionen:
 *   --codes E11.9,I10,G43     Nur bestimmte Codes importieren
 *   --overwrite               Bestehende MD-Dateien überschreiben
 *   --all                     Alle Codes importieren (erzeugt tausende Dateien!)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, "../knowledge");

// ─── CLI-Argumente ────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const xmlPath = args[0];
const overwrite = args.includes("--overwrite");
const importAll = args.includes("--all");
const codesArg = args.find(a => a.startsWith("--codes="));
const filterCodes = codesArg
  ? codesArg.replace("--codes=", "").split(",").map(c => c.trim().toUpperCase())
  : null;

if (!xmlPath) {
  console.error("Verwendung: node scripts/importIcd10.js <pfad/zur/claml.xml> [--codes=E11.9,I10] [--overwrite] [--all]");
  process.exit(1);
}

if (!existsSync(xmlPath)) {
  console.error(`❌ Datei nicht gefunden: ${xmlPath}`);
  console.error("   Bitte zuerst von BfArM herunterladen: https://www.bfarm.de/DE/Kodiersysteme/Services/Downloads/_node.html");
  process.exit(1);
}

if (!existsSync(KNOWLEDGE_DIR)) mkdirSync(KNOWLEDGE_DIR, { recursive: true });

// ─── XML einlesen ─────────────────────────────────────────────────────────────
console.log(`📂 Lese XML: ${xmlPath}`);
const xml = readFileSync(xmlPath, "utf-8");

// ─── Einfacher Regex-Parser für ClaML ────────────────────────────────────────
// Kein externer XML-Parser nötig – ClaML ist regelmässig strukturiert.

function extractClasses(xml) {
  const classes = [];
  const classRegex = /<Class\s+code="([^"]+)"[^>]*kind="([^"]+)"[^>]*>([\s\S]*?)<\/Class>/g;
  let match;

  while ((match = classRegex.exec(xml)) !== null) {
    const code = match[1];
    const kind = match[2];
    const body = match[3];

    if (kind !== "category" && kind !== "block") continue;

    const rubrics = {};
    const rubricRegex = /<Rubric[^>]*kind="([^"]+)"[^>]*>([\s\S]*?)<\/Rubric>/g;
    let rMatch;

    while ((rMatch = rubricRegex.exec(body)) !== null) {
      const rKind = rMatch[1];
      const labels = [];
      const labelRegex = /<Label[^>]*>([\s\S]*?)<\/Label>/g;
      let lMatch;
      while ((lMatch = labelRegex.exec(rMatch[2])) !== null) {
        const text = lMatch[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
        if (text) labels.push(text);
      }
      if (!rubrics[rKind]) rubrics[rKind] = [];
      rubrics[rKind].push(...labels);
    }

    classes.push({ code, rubrics });
  }

  return classes;
}

// ─── MD-Datei generieren ──────────────────────────────────────────────────────
function generateMd(code, rubrics) {
  const preferred = (rubrics["preferred"] || [])[0] || code;
  const inclusions = rubrics["inclusion"] || [];
  const exclusions = rubrics["exclusion"] || [];
  const texts = rubrics["text"] || [];
  const notes = rubrics["note"] || [];

  let md = `# ${preferred} (${code})\n\n`;
  md += `## Bezeichnung (BfArM ICD-10-GM 2026)\n${preferred}\n\n`;

  if (texts.length > 0) {
    md += `## Hinweise\n${texts.join("\n")}\n\n`;
  }

  if (inclusions.length > 0) {
    md += `## Inklusiva (gehört dazu)\n${inclusions.map(i => `- ${i}`).join("\n")}\n\n`;
  }

  if (exclusions.length > 0) {
    md += `## Exklusiva (gehört nicht dazu)\n${exclusions.map(e => `- ${e}`).join("\n")}\n\n`;
  }

  if (notes.length > 0) {
    md += `## Anmerkungen\n${notes.join("\n")}\n\n`;
  }

  md += `## Quelle\nBfArM ICD-10-GM 2026 (automatisch importiert)\n`;
  md += `\n---\n`;
  md += `_Dieses File wurde automatisch aus dem BfArM ClaML-Export generiert._\n`;
  md += `_Bitte durch medizinisches Fachpersonal prüfen und ergänzen._\n`;

  return md;
}

// ─── Hauptlogik ───────────────────────────────────────────────────────────────
console.log("🔍 Parse XML...");
const classes = extractClasses(xml);
console.log(`   ${classes.length} Codes gefunden`);

let imported = 0;
let skipped = 0;
let filtered = 0;

for (const { code, rubrics } of classes) {
  // Filter anwenden
  if (filterCodes && !filterCodes.includes(code.toUpperCase())) {
    filtered++;
    continue;
  }

  if (!importAll && !filterCodes) {
    // Ohne --all oder --codes: nur warnen
    console.log(`ℹ️  Ohne --all oder --codes werden keine Dateien erstellt.`);
    console.log(`   Beispiel: node scripts/importIcd10.js <xml> --codes=E11.9,I10,G43`);
    process.exit(0);
  }

  const filename = code.toLowerCase().replace(/\s/g, "") + ".md";
  const filepath = join(KNOWLEDGE_DIR, filename);

  if (existsSync(filepath) && !overwrite) {
    skipped++;
    continue;
  }

  const md = generateMd(code, rubrics);
  writeFileSync(filepath, md, "utf-8");
  imported++;
  console.log(`✅ ${code} → knowledge/${filename}`);
}

console.log(`\n📊 Ergebnis:`);
console.log(`   Importiert:  ${imported}`);
console.log(`   Übersprungen (existieren bereits): ${skipped}`);
if (filtered > 0) console.log(`   Gefiltert:   ${filtered}`);
console.log(`\nHinweis: Importierte Dateien bitte durch medizinisches Fachpersonal prüfen!`);
