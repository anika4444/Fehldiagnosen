import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, "knowledge");
const ICD10_PATTERN = /^[a-z][0-9]{2}(\.[0-9a-z]{1,4})?$/;

/**
 * Lädt die MD-Wissensdatei für einen ICD-10-Code.
 * Dateiname = Code in Kleinbuchstaben, Punkte bleiben: e11.9.md
 *
 * @param {string|undefined} icd10Code
 * @returns {string|null} Dateiinhalt oder null wenn nicht gefunden
 */
export function getIcdContext(icd10Code) {
  if (!icd10Code || icd10Code === "[NICHT ANGEGEBEN]") return null;

  const code = icd10Code.toLowerCase().replace(/\s/g, "");

  // Nur echte ICD-10-Codes zulassen (z.B. e11, e11.9, u07.1), damit der Code
  // aus dem Request nicht als Pfad (z.B. "../../") missbraucht werden kann
  if (!ICD10_PATTERN.test(code)) return null;

  const filename = code + ".md";
  const filepath = join(KNOWLEDGE_DIR, filename);

  // Exakter Treffer
  if (existsSync(filepath)) {
    return readFileSync(filepath, "utf-8").trim();
  }

  // Fallback: Elterncode ohne Subkode versuchen (z.B. E11.9 → E11)
  const parentCode = code.split(".")[0];
  const parentPath = join(KNOWLEDGE_DIR, parentCode + ".md");
  if (existsSync(parentPath)) {
    return readFileSync(parentPath, "utf-8").trim();
  }

  return null;
}
