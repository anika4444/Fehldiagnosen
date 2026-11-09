import client from "prom-client";

// Metriken im Prometheus-Format, abrufbar über GET /metrics.
// Standard-Metriken (CPU, Speicher, Event-Loop-Verzögerung) kommen von prom-client,
// dazu HTTP-Metriken und die fachlichen Metriken für die KI-Aufrufe.

export const register = new client.Registry();
register.setDefaultLabels({ service: "ai" });
client.collectDefaultMetrics({ register });

// LLM-Aufrufe dauern mehrere Sekunden, daher größere Buckets als üblich
const DURATION_BUCKETS = [0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 20, 30, 60];

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Dauer der HTTP-Requests",
  labelNames: ["method", "route", "status_code"],
  buckets: DURATION_BUCKETS,
  registers: [register],
});

const llmRequestDuration = new client.Histogram({
  name: "llm_request_duration_seconds",
  help: "Dauer der Aufrufe an das Sprachmodell",
  labelNames: ["operation", "model", "outcome"],
  buckets: DURATION_BUCKETS,
  registers: [register],
});

const llmRequestsTotal = new client.Counter({
  name: "llm_requests_total",
  help: "Anzahl der Aufrufe an das Sprachmodell nach Ergebnis (success/error)",
  labelNames: ["operation", "model", "outcome"],
  registers: [register],
});

export const validatorAttempts = new client.Histogram({
  name: "ai_explain_validator_attempts",
  help: "Benötigte Generierungsversuche pro Erklärung, bis der Validator sie akzeptiert",
  labelNames: ["validated"],
  buckets: [1, 2, 3, 4, 5],
  registers: [register],
});

export const validatorResults = new client.Counter({
  name: "ai_explain_validator_results_total",
  help: "Ergebnisse des Validators pro geprüfter Erklärung (pass/fail)",
  labelNames: ["result"],
  registers: [register],
});

export const icdContextLookups = new client.Counter({
  name: "ai_icd_context_lookups_total",
  help: "ICD-Wissenskontext gefunden (hit) oder nicht vorhanden (miss)",
  labelNames: ["result"],
  registers: [register],
});

export const invalidAiResponses = new client.Counter({
  name: "ai_invalid_responses_total",
  help: "KI-Antworten, die nicht ausgewertet werden konnten (z. B. kein gültiges JSON)",
  labelNames: ["operation"],
  registers: [register],
});

// Middleware: misst jeden Request. Als Route wird das Express-Muster verwendet
// (nicht die konkrete URL), damit die Anzahl der Zeitreihen begrenzt bleibt.
export function httpMetrics(req, res, next) {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    const route = req.route ? req.baseUrl + req.route.path : "unmatched";
    end({ method: req.method, route, status_code: res.statusCode });
  });
  next();
}

/**
 * Führt einen LLM-Aufruf aus und erfasst Dauer und Ergebnis.
 * @template T
 * @param {string} operation  z. B. "explain", "validate", "medical-letter"
 * @param {string|undefined} model  Modellname (aus der Umgebung)
 * @param {() => Promise<T>} fn
 * @returns {Promise<T>}
 */
export async function trackLlmCall(operation, model, fn) {
  const labels = { operation, model: model || "unknown" };
  const end = llmRequestDuration.startTimer(labels);
  try {
    const result = await fn();
    end({ outcome: "success" });
    llmRequestsTotal.inc({ ...labels, outcome: "success" });
    return result;
  } catch (error) {
    end({ outcome: "error" });
    llmRequestsTotal.inc({ ...labels, outcome: "error" });
    throw error;
  }
}

export async function metricsHandler(req, res) {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
}
