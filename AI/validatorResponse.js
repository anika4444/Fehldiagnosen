import { logger } from "./observability/logger.js";
import { invalidAiResponses } from "./observability/metrics.js";

/**
 * Wertet die Rohantwort des Validator-Modells aus.
 * Das Modell soll JSON wie {"score": 1, "feedback": "..."} liefern,
 * packt es aber oft in Fließtext oder Markdown – daher wird das erste {...} gesucht.
 *
 * @param {string} raw Rohantwort des Validators
 * @returns {{score: 0|1, feedback: string}}
 */
export function parseValidatorResponse(raw) {
  const match = raw.match(/\{[\s\S]*\}/);

  if (!match) {
    invalidAiResponses.inc({ operation: "validate" });
    logger.warn({ responseLength: raw.length }, "Validator hat kein JSON geliefert");
    return {
      score: 0,
      feedback:
        "Interner Fehler: Validator-Antwort konnte nicht ausgewertet werden.",
    };
  }

  try {
    const result = JSON.parse(match[0]);
    return {
      score: result.score === 1 ? 1 : 0,
      feedback: result.feedback || "",
    };
  } catch (e) {
    invalidAiResponses.inc({ operation: "validate" });
    logger.warn({ err: e }, "Validator-Antwort ist kein gültiges JSON");
    return {
      score: 0,
      feedback: "Interner Fehler: Validator-Antwort ist ungültig.",
    };
  }
}
