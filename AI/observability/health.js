import { Router } from "express";

// Health-Endpoints:
//   GET /ai/health/live  → Prozess läuft (für den Docker-HEALTHCHECK)
//   GET /ai/health       → Service ist einsatzbereit, inkl. Prüfung der Konfiguration.
//                          200 = healthy, 503 = unhealthy (mit Grund pro Check)
//
// Das Sprachmodell selbst wird bewusst nicht aufgerufen: Jeder Aufruf kostet Geld und
// Health-Checks laufen alle paar Sekunden. Ob das Modell antwortet, zeigen die Metriken
// llm_requests_total{outcome="error"}.

const REQUIRED_ENV = [
  "AI_API_KEY",
  "AI_BASE_URL",
  "AI_MODEL_NAME",
  "AI_MODEL_NAME_DIAGNOSIS",
  "AI_MODEL_NAME_MEDICATION",
  "VALIDATOR_MODEL_NAME",
];

export function checkConfiguration(env = process.env) {
  const missing = REQUIRED_ENV.filter((name) => !env[name]);
  return missing.length === 0
    ? { status: "healthy" }
    : { status: "unhealthy", description: `Fehlende Umgebungsvariablen: ${missing.join(", ")}` };
}

export function createHealthRouter(version) {
  const router = Router();

  router.get("/ai/health/live", (req, res) => res.json({ status: "healthy" }));

  router.get("/ai/health", (req, res) => {
    const checks = { configuration: checkConfiguration() };
    const healthy = Object.values(checks).every((c) => c.status === "healthy");

    res.status(healthy ? 200 : 503).json({
      status: healthy ? "healthy" : "unhealthy",
      version,
      uptimeSeconds: Math.round(process.uptime()),
      checks,
    });
  });

  return router;
}
