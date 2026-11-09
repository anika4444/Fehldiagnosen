import { randomUUID } from "node:crypto";
import pino from "pino";
import pinoHttp from "pino-http";

// Strukturierte Logs (JSON, eine Zeile pro Ereignis), damit sie maschinell auswertbar sind.
// Lokal (NODE_ENV != production) lesbar formatiert über pino-pretty, in Docker reines JSON.
// LOG_LEVEL: trace | debug | info | warn | error (Standard: info)
//
// WICHTIG: Keine Patientendaten loggen (Diagnosen, Arztbrief-Text, KI-Antworten).
// Nur Metadaten wie ICD-Code, Dauer, Anzahl Versuche, Ergebnis.

const isTest = Boolean(process.env.NODE_TEST_CONTEXT);
const isProduction = process.env.NODE_ENV === "production";

function prettyTransport() {
  if (isProduction || isTest) return undefined;
  try {
    // pino-pretty ist nur devDependency, im Docker-Image also nicht vorhanden
    import.meta.resolve("pino-pretty");
    return {
      target: "pino-pretty",
      options: { translateTime: "SYS:HH:MM:ss", ignore: "pid,hostname,service" },
    };
  } catch {
    return undefined;
  }
}

export const logger = pino({
  level: isTest ? "silent" : process.env.LOG_LEVEL || "info",
  base: { service: "ai" },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: prettyTransport(),
});

// Ein Log-Eintrag pro Request mit Methode, Pfad, Status, Dauer und Request-ID.
// Die Request-ID kommt vom Backend (Header X-Request-ID) oder wird neu erzeugt,
// so lassen sich Backend- und AI-Logs zu einem Aufruf zusammenführen.
export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const id = req.headers["x-request-id"] || randomUUID();
    res.setHeader("X-Request-ID", id);
    return id;
  },
  // Health- und Metrik-Abfragen kommen alle paar Sekunden und würden das Log fluten
  autoLogging: {
    ignore: (req) => req.url.startsWith("/ai/health") || req.url === "/metrics",
  },
  customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,
  customErrorMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,
  // Bei 5xx erzeugt pino-http einen eigenen Fehler ohne Aussage. Die eigentliche Ursache
  // steht bereits im Log-Eintrag des Endpoints (req.log.error), daher hier weglassen.
  customErrorObject: (req, res, err, val) => {
    if (err?.message?.startsWith("failed with status code")) {
      const { err: _ignored, ...rest } = val;
      return rest;
    }
    return val;
  },
  // Bewusst ohne Header und Body (Authorization, Patientendaten)
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
});
