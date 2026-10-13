import { describe, it, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import { parseValidatorResponse } from "../validatorResponse.js";

describe("parseValidatorResponse", () => {
  beforeEach(() => {
    // Erwartete Warnungen nicht in die Testausgabe schreiben
    mock.method(console, "warn", () => {});
  });

  it("wertet reines JSON mit score 1 aus", () => {
    assert.deepEqual(parseValidatorResponse('{"score": 1, "feedback": ""}'), {
      score: 1,
      feedback: "",
    });
  });

  it("findet JSON mitten im Fließtext und Markdown", () => {
    const raw = 'Hier ist meine Bewertung:\n```json\n{"score": 0, "feedback": "ICD-Code fehlt"}\n```\nDanke!';

    assert.deepEqual(parseValidatorResponse(raw), {
      score: 0,
      feedback: "ICD-Code fehlt",
    });
  });

  it("akzeptiert nur die Zahl 1 als bestanden", () => {
    assert.equal(parseValidatorResponse('{"score": "1"}').score, 0);
    assert.equal(parseValidatorResponse('{"score": true}').score, 0);
    assert.equal(parseValidatorResponse('{"score": 2}').score, 0);
  });

  it("setzt fehlendes Feedback auf einen leeren String", () => {
    assert.deepEqual(parseValidatorResponse('{"score": 0}'), { score: 0, feedback: "" });
  });

  it("liefert score 0, wenn kein JSON enthalten ist", () => {
    const result = parseValidatorResponse("Sieht gut aus.");

    assert.equal(result.score, 0);
    assert.match(result.feedback, /konnte nicht ausgewertet werden/);
  });

  it("liefert score 0 bei kaputtem JSON", () => {
    const result = parseValidatorResponse('{"score": 1, feedback: }');

    assert.equal(result.score, 0);
    assert.match(result.feedback, /ungültig/);
  });
});
