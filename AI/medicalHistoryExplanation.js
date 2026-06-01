import { Router } from "express";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage } from "@langchain/core/messages";

import { MistralProviderFactory } from "./providers/MistralProviderFactory.js";
import { getIcdContext } from "./icd10Lookup.js";
import { ChainBuilder } from "./chainBuilder.js";

const router = Router();

const MAX_ATTEMPTS = parseInt(process.env.MAX_VALIDATION_ATTEMPTS || "3");

// ─── Abstract Factory: Provider wählen ──────────────────────────────────────
// Für einen Provider-Wechsel reicht es, diese eine Zeile zu tauschen:
//   import { OpenAIProviderFactory } from "./providers/OpenAIProviderFactory.js";
//   const factory = new OpenAIProviderFactory();
const factory = new MistralProviderFactory();

// ─── Factory Method: Modelle ─────────────────────────────────────────────────
const model = factory.createModel();
const validatorModel = factory.createValidatorModel();

// ─── Factory Method: Prompts ─────────────────────────────────────────────────
const medicalPrompt = factory.createPrompt("medicalHistory");
const validatorPrompt = factory.createPrompt("validator");

// ─── Builder: Validator-Chain ────────────────────────────────────────────────
const validatorChain = new ChainBuilder()
  .withPrompt(validatorPrompt)
  .withModel(validatorModel)
  .withParser(new StringOutputParser())
  .build();

// ─── Enum-Mappings (passend zum C#-Backend) ──────────────────────────────────
// ConditionStatus: Chronical=0, Active=1, InRemission=2
const STATUS_MAP = {
  0: "chronisch",     // Chronical
  1: "aktiv",         // Active
  2: "in Remission",  // InRemission
};

// EntryBy: Patient=0, Doctor=1
const ENTRY_BY_MAP = {
  0: "patient",
  1: "doctor",
};

// CommunicationLevel.Name aus der DB → langLevel für den Prompt
const LANG_LEVEL_MAP = {
  L1: "basic",
  L2: "mittel",
  L3: "medizinisch",
};

// ─── Validierungsfunktion ────────────────────────────────────────────────────
async function validateExplanation(text, inputData) {
  const raw = await validatorChain.invoke({ text, ...inputData });

  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    console.warn("⚠️  Validator hat kein valides JSON geliefert:", raw);
    return { score: 0, feedback: "Interner Fehler: Validator-Antwort konnte nicht ausgewertet werden." };
  }

  try {
    const result = JSON.parse(match[0]);
    return {
      score: result.score === 1 ? 1 : 0,
      feedback: result.feedback || "",
    };
  } catch (e) {
    console.warn("⚠️  JSON-Parse-Fehler vom Validator:", e.message);
    return { score: 0, feedback: "Interner Fehler: Validator-Antwort ist ungültig." };
  }
}

// ─── Endpoint: POST /ai/explain ──────────────────────────────────────────────
router.post("/ai/explain", async (req, res) => {
  try {
    const {
      diagnosis,
      icd10Code,
      year,
      status,
      entryBy,
      comment,
      langLevel,
      // kiPrompt wird aktuell noch nicht genutzt, aber als Parameter akzeptiert
      // kiPrompt,
    } = req.body;

    if (!diagnosis) {
      return res.status(400).json({ error: "Fehlende Diagnose" });
    }

    const rawIcdContext = getIcdContext(icd10Code);
    // Geschweifte Klammern escapen damit LangChain sie nicht als Template-Variablen wertet
    const escapedContext = rawIcdContext
      ? rawIcdContext.replace(/\{/g, "{{").replace(/\}/g, "}}")
      : null;
    const icdContext = escapedContext
      ? `MEDIZINISCHER KONTEXT (kuratierte Quelle, darf verwendet werden):\n${escapedContext}\n\n`
      : "";

    if (rawIcdContext) {
      console.log(`📚 Wissenskontext geladen für ICD-Code: ${icd10Code}`);
    }

    const inputData = {
      diagnosis,
      icd10Code: icd10Code || "[NICHT ANGEGEBEN]",
      year: year != null ? String(year) : "[NICHT ANGEGEBEN]",
      status: STATUS_MAP[status] ?? "[NICHT ANGEGEBEN]",
      sourceType: ENTRY_BY_MAP[entryBy] ?? "patient",
      comment: comment || "[NICHT ANGEGEBEN]",
      langLevel: LANG_LEVEL_MAP[langLevel] || langLevel || "basic",
      icdContext,
    };

    let responseText = "";
    let attempts = 0;
    let validated = false;
    let lastFeedback = "";
    let validatorLogs = [];

    // ── Retry-Loop ───────────────────────────────────────────────────────────
    while (attempts < MAX_ATTEMPTS) {
      attempts++;

      const messages = await medicalPrompt.formatMessages(inputData);

      if (attempts > 1 && lastFeedback) {
        messages.push(
          new HumanMessage(
            `Deine vorherige Antwort war leider nicht korrekt. Fehler:\n\n${lastFeedback}\n\nBitte generiere die Erklärung erneut und behebe diese Fehler.`
          )
        );
      }

      console.log(`▶️  Versuch ${attempts}/${MAX_ATTEMPTS} – Hauptmodell generiert...`);
      const aiMessage = await model.invoke(messages);
      responseText = aiMessage.content.replace(/\n+/g, " ").trim();

      console.log(`🔍 Validator prüft Versuch ${attempts}...`);
      const validation = await validateExplanation(responseText, inputData);

      if (validation.score === 1) {
        validated = true;
        console.log(`✅ Validator: OK nach ${attempts} Versuch(en)`);
        break;
      }

      lastFeedback = validation.feedback;
      validatorLogs.push(`Versuch ${attempts}: ${lastFeedback}`);
      console.log(`❌ Validator: FAIL (Versuch ${attempts}) → ${lastFeedback}`);
    }

    // ── Response ─────────────────────────────────────────────────────────────
    res.json({
      text: responseText,
      disclaimer: "Dies ist eine KI-generierte Erklärung - kein Ersatz für ein persönliches Arztgespräch.",
    });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "KI-Service aktuell nicht erreichbar" });
  }
});

export default router;
