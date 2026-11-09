#!/usr/bin/env node
// Startet einen Befehl mit der Konfiguration einer Umgebung (dev, test, prod).
//
//   node scripts/env-run.mjs [--no-secrets] <dev|test|prod> <befehl> [argumente...]
//   node scripts/env-run.mjs test dotnet run --project Backend/Backend
//
// --no-secrets: Pflicht-Secrets nicht prüfen (für Builds, die nur die
//               nicht-geheimen Werte brauchen, z. B. die API-URL fürs Frontend).
//
// Welche Werte woher kommen, steht in load-config.mjs.
// Keine Abhängigkeiten, damit es auch ohne "npm install" (z. B. in der CI) läuft.

import { spawn } from "node:child_process";
import { ENVIRONMENTS, loadConfig } from "./load-config.mjs";

// Ohne diese Werte startet das Backend bzw. der AI-Service nicht sinnvoll.
// In dev kommen sie aus appsettings.Development.json bzw. AI/.env.
const REQUIRED = {
  dev: [],
  test: ["ConnectionStrings__mySqlDb", "JwtSettings__Secret", "AI_API_KEY"],
  prod: ["ConnectionStrings__mySqlDb", "JwtSettings__Secret", "AI_API_KEY"],
};

const args = process.argv.slice(2);
const checkSecrets = args[0] !== "--no-secrets";
if (!checkSecrets) args.shift();
const [envName, ...command] = args;

if (!ENVIRONMENTS.includes(envName) || command.length === 0) {
  console.error(`Aufruf: node scripts/env-run.mjs [--no-secrets] <${ENVIRONMENTS.join("|")}> <befehl> [argumente...]`);
  process.exit(1);
}

let config;
try {
  config = loadConfig(envName);
} catch (error) {
  console.error(`[env-run] ${error.message}`);
  process.exit(1);
}

const missing = (checkSecrets ? REQUIRED[envName] : []).filter((key) => !config[key]);
if (missing.length > 0) {
  console.error(
    `[env-run] Für "${envName}" fehlen: ${missing.join(", ")}\n` +
      `          Vorlage kopieren und ausfüllen: config/local.env.example -> config/${envName}.local.env`,
  );
  process.exit(1);
}

console.log(`[env-run] Umgebung: ${envName}`);

// shell: true, damit npm/npx/dotnet unter Windows (.cmd) gefunden werden
const quoted = command.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg));
const child = spawn(quoted.join(" "), { stdio: "inherit", shell: true, env: { ...process.env, ...config } });
child.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 1)));
