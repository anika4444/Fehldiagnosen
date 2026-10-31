#!/usr/bin/env node
// Prüft, ob die Container laufen und die Konfiguration der Umgebung angekommen ist.
//
//   node scripts/docker-check.mjs <dev|test|prod> [erwartete-version]
//
// Geprüft wird:
//   1. AI-Service antwortet auf GET /ai/version (optional: mit der erwarteten Version)
//   2. Frontend liefert die Startseite aus
//   3. Im ausgelieferten JavaScript steht die API-URL dieser Umgebung
//      (und nicht mehr der Platzhalter aus dem Image-Build)
//   4. Backend (läuft außerhalb von Docker): nur Hinweis, falls nicht erreichbar

import { ENVIRONMENTS, loadConfig } from "./load-config.mjs";

const [envName, expectedVersion] = process.argv.slice(2);
if (!ENVIRONMENTS.includes(envName)) {
  console.error(`Aufruf: node scripts/docker-check.mjs <${ENVIRONMENTS.join("|")}> [erwartete-version]`);
  process.exit(1);
}

const config = loadConfig(envName);
const aiUrl = `http://localhost:${config.PORT ?? 3000}`;
const frontendUrl = `http://localhost:${config.FRONTEND_PORT ?? 8080}`;
// Der Frontend-Container bekommt die URL ohne *.local.env (siehe docker-compose.yml)
const apiUrl = loadConfig(envName, { includeLocal: false }).EXPO_PUBLIC_API_URL ?? "http://localhost:5238/api";
const placeholder = "__EXPO_PUBLIC_API_URL__";

let failed = 0;
const ok = (msg) => console.log(`  OK    ${msg}`);
const fail = (msg) => {
  failed++;
  console.log(`  FEHLER ${msg}`);
};

// Container brauchen nach dem Start ein paar Sekunden
async function fetchWithRetry(url, attempts = 30) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      if (i >= attempts) return res;
    } catch (error) {
      if (i >= attempts) throw error;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
}

console.log(`Konfigurationstest für "${envName}"\n`);

// 1. AI-Service
try {
  const res = await fetchWithRetry(`${aiUrl}/ai/version`);
  const { version } = await res.json();
  if (expectedVersion && version !== expectedVersion) {
    fail(`AI-Service meldet Version ${version}, erwartet ${expectedVersion}`);
  } else {
    ok(`AI-Service erreichbar (${aiUrl}), Version ${version}`);
  }
} catch (error) {
  fail(`AI-Service nicht erreichbar (${aiUrl}): ${error.message}`);
}

// 2. + 3. Frontend und eingesetzte API-URL
try {
  const res = await fetchWithRetry(frontendUrl);
  const html = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  ok(`Frontend erreichbar (${frontendUrl})`);

  const scripts = [...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]);
  const bundles = await Promise.all(scripts.map((src) => fetch(new URL(src, frontendUrl)).then((r) => r.text())));
  const code = bundles.join("\n");

  if (code.includes(placeholder)) {
    fail(`Platzhalter ${placeholder} wurde nicht ersetzt`);
  } else if (code.includes(apiUrl)) {
    ok(`Frontend nutzt API-URL ${apiUrl}`);
  } else {
    fail(`API-URL ${apiUrl} nicht im Frontend gefunden`);
  }
} catch (error) {
  fail(`Frontend nicht erreichbar (${frontendUrl}): ${error.message}`);
}

// 4. Backend (außerhalb von Docker, daher kein Fehler)
try {
  const res = await fetch(`${apiUrl}/version`, { signal: AbortSignal.timeout(2000) });
  const { version } = await res.json();
  ok(`Backend erreichbar, Version ${version}`);
} catch {
  console.log(`  INFO  Backend unter ${apiUrl} nicht erreichbar (läuft außerhalb von Docker, ggf. "npm run dev:backend")`);
}

console.log(failed ? `\n${failed} Prüfung(en) fehlgeschlagen.` : "\nAlle Prüfungen erfolgreich.");
// exitCode statt process.exit(): process.exit() bei offenen Verbindungen bringt Node unter Windows zum Absturz
process.exitCode = failed ? 1 : 0;
