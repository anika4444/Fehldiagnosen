import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { checkConfiguration } from "../observability/health.js";

const COMPLETE_ENV = {
  AI_API_KEY: "key",
  AI_BASE_URL: "https://example.org",
  AI_MODEL_NAME: "main",
  AI_MODEL_NAME_DIAGNOSIS: "diagnosis",
  AI_MODEL_NAME_MEDICATION: "medication",
  VALIDATOR_MODEL_NAME: "validator",
};

describe("checkConfiguration", () => {
  it("ist healthy, wenn alle Umgebungsvariablen gesetzt sind", () => {
    assert.deepEqual(checkConfiguration(COMPLETE_ENV), { status: "healthy" });
  });

  it("nennt fehlende Umgebungsvariablen, aber nicht deren Werte", () => {
    const result = checkConfiguration({ ...COMPLETE_ENV, AI_API_KEY: "", VALIDATOR_MODEL_NAME: undefined });

    assert.equal(result.status, "unhealthy");
    assert.match(result.description, /AI_API_KEY/);
    assert.match(result.description, /VALIDATOR_MODEL_NAME/);
    assert.doesNotMatch(result.description, /main/);
  });
});
