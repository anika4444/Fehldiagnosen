import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getIcdContext } from "../icd10Lookup.js";

const KNOWLEDGE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "knowledge");
const knowledge = (file) => readFileSync(join(KNOWLEDGE_DIR, file), "utf-8").trim();

describe("getIcdContext", () => {
  it("liefert die Datei bei exaktem Treffer mit Subkode", () => {
    assert.equal(getIcdContext("E11.9"), knowledge("e11.9.md"));
  });

  it("liefert die Datei bei exaktem Treffer ohne Subkode", () => {
    assert.equal(getIcdContext("I10"), knowledge("i10.md"));
  });

  it("fällt auf den Elterncode zurück, wenn der Subkode fehlt", () => {
    assert.equal(getIcdContext("E11.5"), knowledge("e11.md"));
  });

  it("ignoriert Groß-/Kleinschreibung und Leerzeichen", () => {
    assert.equal(getIcdContext("e 11 . 9"), knowledge("e11.9.md"));
    assert.equal(getIcdContext(" J45 "), knowledge("j45.md"));
  });

  it("liefert null für unbekannte Codes", () => {
    assert.equal(getIcdContext("Z99.9"), null);
  });

  it("liefert null ohne Code oder mit Platzhalter", () => {
    assert.equal(getIcdContext(undefined), null);
    assert.equal(getIcdContext(""), null);
    assert.equal(getIcdContext("[NICHT ANGEGEBEN]"), null);
  });

  it("lässt keine Pfade außerhalb des Wissensordners zu", () => {
    assert.equal(getIcdContext("../../README"), null);
    assert.equal(getIcdContext("../package"), null);
    assert.equal(getIcdContext("_VORLAGE"), null);
  });
});
