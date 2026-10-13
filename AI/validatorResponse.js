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
    console.warn("⚠️ Validator hat kein valides JSON geliefert:", raw);
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
    console.warn("⚠️ JSON-Parse-Fehler vom Validator:", e.message);
    return {
      score: 0,
      feedback: "Interner Fehler: Validator-Antwort ist ungültig.",
    };
  }
}
