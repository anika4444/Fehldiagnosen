import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, "knowledge");

/**
 * Lädt die MD-Wissensdatei für einen ICD-10-Code.
 * Dateiname = Code in Kleinbuchstaben, Punkte bleiben: e11.9.md
 *
 * @param {string|undefined} icd10Code
 * @returns {string|null} Dateiinhalt oder null wenn nicht gefunden
 */
export function getIcdContext(icd10Code) {
  if (!icd10Code || icd10Code === "[NICHT ANGEGEBEN]") return null;

  const filename = icd10Code.toLowerCase().replace(/\s/g, "") + ".md";
  const filepath = join(KNOWLEDGE_DIR, filename);

  // Exakter Treffer
  if (existsSync(filepath)) {
    return readFileSync(filepath, "utf-8").trim();
  }

  // Fallback: Elterncode ohne Subkode versuchen (z.B. E11.9 → E11)
  const parentCode = icd10Code.toLowerCase().replace(/\s/g, "").split(".")[0];
  const parentPath = join(KNOWLEDGE_DIR, parentCode + ".md");
  if (existsSync(parentPath)) {
    return readFileSync(parentPath, "utf-8").trim();
  }

  return null;
}
