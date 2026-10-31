// Liest die Konfiguration einer Umgebung (dev, test, prod) aus config/.
// Gemeinsam genutzt von env-run.mjs und docker-check.mjs.
//
// Priorität (der erste gesetzte Wert gewinnt):
//   1. echte Umgebungsvariablen
//   2. config/<env>.local.env   geheime/persönliche Werte, nicht im Repo
//   3. config/<env>.env         nicht-geheime Werte, im Repo
// Leere Werte (KEY=) gelten als "nicht gesetzt".

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";

export const ENVIRONMENTS = ["dev", "test", "prod"];

const configDir = join(dirname(fileURLToPath(import.meta.url)), "..", "config");

function readEnvFile(file, { optional }) {
  const path = join(configDir, file);
  if (!existsSync(path)) {
    if (optional) return {};
    throw new Error(`${path} fehlt.`);
  }
  return parseEnv(readFileSync(path, "utf8"));
}

/**
 * Liefert die zusammengeführte Konfiguration, ohne process.env zu verändern.
 * includeLocal: false ignoriert config/<env>.local.env (so wie Docker Compose
 * bei Variablen, die nur über --env-file kommen).
 */
export function loadConfig(envName, { includeLocal = true } = {}) {
  if (!ENVIRONMENTS.includes(envName)) {
    throw new Error(`Unbekannte Umgebung "${envName}". Erlaubt: ${ENVIRONMENTS.join(", ")}`);
  }
  const config = {};
  const sources = [
    process.env,
    includeLocal ? readEnvFile(`${envName}.local.env`, { optional: true }) : {},
    readEnvFile(`${envName}.env`, { optional: false }),
  ];
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      if (value !== undefined && value !== "" && config[key] === undefined) config[key] = value;
    }
  }
  return config;
}
