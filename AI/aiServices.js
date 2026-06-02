import express from "express";
import dotenv from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { MistralProviderFactory } from "./providers/MistralProviderFactory.js";
import { getIcdContext } from "./icd10Lookup.js";
import { ChainBuilder } from "./chainBuilder.js";

dotenv.config();

const app = express();
app.use(express.json());

const MAX_ATTEMPTS = parseInt(process.env.MAX_VALIDATION_ATTEMPTS || "3");
const factory = new MistralProviderFactory();

const model = factory.createModel();
const validatorModel = factory.createValidatorModel();
const medicalPrompt = factory.createPrompt("medicalHistory");
const validatorPrompt = factory.createPrompt("validator");

const validatorChain = new ChainBuilder()
    .withPrompt(validatorPrompt)
    .withModel(validatorModel)
    .withParser(new StringOutputParser())
    .build();

const STATUS_MAP = {
    0: "chronisch",
    1: "aktiv",
    2: "in Remission",
};

const ENTRY_BY_MAP = {
    0: "patient",
    1: "doctor",
};

const LANG_LEVEL_MAP = {
    L1: "basic",
    L2: "mittel",
    L3: "medizinisch",
};

async function validateExplanation(text, inputData) {
    const raw = await validatorChain.invoke({ text, ...inputData });
    const match = raw.match(/\{[\s\S]*\}/);

    if (!match) {
        console.warn("⚠️ Validator hat kein valides JSON geliefert:", raw);
        return { score: 0, feedback: "Interner Fehler: Validator-Antwort konnte nicht ausgewertet werden." };
    }

    try {
        const result = JSON.parse(match[0]);
        return {
            score: result.score === 1 ? 1 : 0,
            feedback: result.feedback || "",
        };
    } catch (e) {
        console.warn("⚠️ JSON-Parse-Fehler vom Validator:", e.message);
        return { score: 0, feedback: "Interner Fehler: Validator-Antwort ist ungültig." };
    }
}

const explainModel = new ChatOpenAI({
    model: process.env.AI_MODEL_NAME,
    apiKey: process.env.AI_API_KEY,
    temperature: 0.3,
    configuration: { baseURL: process.env.AI_BASE_URL },
    defaultHeaders: {
        "HTTP-Referer": process.env.AI_SCRIPT_URL,
        "X-Title": "adam-med-app-prototype",
    },
});

const diagnosisModel = new ChatOpenAI({
    model: process.env.AI_MODEL_NAME_DIAGNOSIS,
    apiKey: process.env.AI_API_KEY,
    temperature: 0.1,
    configuration: { baseURL: process.env.AI_BASE_URL },
    defaultHeaders: {
        "HTTP-Referer": process.env.AI_SCRIPT_URL,
        "X-Title": "adam-med-app-prototype",
    },
});

// ─── SERVICE 1: DIAGNOSE ÜBERSETZUNG (/ai/explain) ───────────────────────────
// JETZT NEU: Mit ICD-Lookup, Factory-Modellen und Retry-Validierungsschleife
app.post("/ai/explain", async (req, res) => {
    try {
        const {
            diagnosis,
            icd10Code,
            year,
            status,
            entryBy,
            comment,
            langLevel,
        } = req.body;

        if (!diagnosis) {
            return res.status(400).json({ error: "Fehlende Diagnose" });
        }

        const rawIcdContext = getIcdContext(icd10Code);
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

        // Retry-Loop
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

            console.log(`▶️ Versuch ${attempts}/${MAX_ATTEMPTS} – Hauptmodell generiert...`);
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

        res.json({
            text: responseText,
            disclaimer: "Dies ist eine KI-generierte Erklärung - kein Ersatz für ein persönliches Arztgespräch.",
        });
    } catch (error) {
        console.error("AI Error:", error.message);
        res.status(500).json({ error: "KI-Service aktuell nicht erreichbar" });
    }
});

// ─── SERVICE 2: ARZTBRIEF INTERPRETATION (/ai/interpret-medical-letter) ─────
const VALID_STATUSES = ["Active", "InRemission", "Chronic"];

function parseDate(raw) {
    if (!raw) return new Date().toISOString();
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d.toISOString();
    const match = String(raw).match(/(\d{4}-\d{2}-\d{2})/);
    if (match) return new Date(match[1]).toISOString();
    const yearMatch = String(raw).match(/(\d{4})/);
    if (yearMatch) return new Date(`${yearMatch[1]}-01-01`).toISOString();
    return new Date().toISOString();
}

const DiagnosisFields = z.object({
    title: z.string().default("Unbekannte Diagnose").transform((val) => val.slice(0, 200)),
    description: z.string().default("").transform((val) => val.slice(0, 1000)),
    icdCode: z.string().default("").transform((val) => val.slice(0, 20)),
    severity: z.string().default("").transform((val) => val.slice(0, 50)),
    sideLocalization: z.string().default("").transform((val) => val.slice(0, 50)),
    status: z.string().default("").transform((val) => {
        const trimmed = val.trim().slice(0, 50);
        return VALID_STATUSES.includes(trimmed) ? trimmed : "";
    }),
    medicationText: z.string().default("").transform((val) => val.slice(0, 500)),
    symptoms: z.string().default("").transform((val) => val.slice(0, 1000)),
    findings: z.string().default("").transform((val) => val.slice(0, 1000)),
    therapeuticMeasures: z.string().default("").transform((val) => val.slice(0, 1000)),
    note: z.string().default("").transform((val) => val.slice(0, 500)),
    diagnosisDate: z.string().default(() => new Date().toISOString()).transform((val) => parseDate(val)),
});

const diagnosisModelWithFields = diagnosisModel.withStructuredOutput(DiagnosisFields);

import { ChatPromptTemplate } from "@langchain/core/prompts"; // Import für Service 2 Prompt Template gelassen
const parsePrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `Du bist ein medizinischer Dokumentationsassistent.
Deine Aufgabe ist es, einen deutschen Arztbrief zu analysieren und die relevanten Informationen strukturiert zu extrahieren.

Felder und ihre Bedeutung:
- title: Kurzer, prägnanter Name der Hauptdiagnose (z.B. "Essentielle Hypertonie"). Max. 200 Zeichen.
- description: Ausführliche Beschreibung der Diagnose, Krankheitsverlauf und medizinischer Kontext. Max. 1000 Zeichen.
- icdCode: ICD-10-Code der Diagnose (z.B. "I10", "E11.9"). Nur den Code, keine Beschreibung. Max. 20 Zeichen.
- severity: Schweregrad der Erkrankung auf deutsch (z.B. mild, moderat, chronisch, schwerwiegend). Max. 50 Zeichen.
- sideLocalization: Körperseite falls relevant (z.B. "links", "rechts", "bilateral"). Leer lassen wenn nicht zutreffend. Max. 50 Zeichen.
- status: Aktueller Status der Erkrankung. Verwende exakt einen dieser Werte: "Active", "InRemission" oder "Chronic".
- medicationText: Alle genannten Medikamente mit Dosierung (z.B. "Ramipril 5mg täglich"). Max. 500 Zeichen.
- symptoms: Genannte Symptome und Beschwerden des Patienten. Max. 1000 Zeichen.
- findings: Medizinische Befunde, Messwerte und Untersuchungsergebnisse (z.B. "HbA1c 8%, RR 160/90 mmHg"). Max. 1000 Zeichen.
- therapeuticMeasures: Empfohlene oder durchgeführte Therapiemaßnahmen außer Medikamente (z.B. "Blutdruckkontrolle alle 3 Monate, Ernährungsberatung"). Max. 1000 Zeichen.
- note: Sonstige relevante Hinweise oder Besonderheiten die nicht in andere Felder passen. Max. 500 Zeichen.
- diagnosisDate: Datum der Erstdiagnose im ISO-8601 Format (z.B. "2018-01-01"). Wenn nur ein Jahr genannt ist, nimm den 1. Januar dieses Jahres.

Regeln:
- Erfinde keine Informationen, die nicht im Brief stehen.
- Lasse Felder leer ("") wenn keine relevante Information vorhanden ist.
- Ignoriere Platzhalter in [] - das sind sensible Daten die nicht angezeigt werden.
- Alle Strings müssen UTF-8-konform sein.`,
    ],
    [
        "human",
        "Analysiere folgenden Arztbrief und extrahiere die Felder:\n\n{letterText}",
    ],
]);

const diagnosisChain = parsePrompt.pipe(diagnosisModelWithFields);

app.post("/ai/interpret-medical-letter", async (req, res) => {
    try {
        const letterText = req.body?.letterText;

        if (!letterText || !String(letterText).trim()) {
            return res.status(400).json({ error: "Kein Arztbrief-Text übergeben." });
        }

        const extracted = await diagnosisChain.invoke({ letterText });
        return res.json({ extracted });

    } catch (error) {
        console.error("AI Parse Error:", error?.message || error);
        return res.status(500).json({ error: "KI-Service aktuell nicht erreichbar." });
    }
});

// ─── SERVICE 3: MEDIKAMENTEN-BILD ANALYSE (/ai/interpret-medication-image) ──
const MedicationFields = z.object({
    name: z.string(),
    dosage: z.string(),
    intakeFrequency: z.string(),
    indication: z.string(),
    atcCode: z.string(),
    notes: z.string(),
});

const medicationModelWithFields = explainModel.withStructuredOutput(MedicationFields);

app.post("/ai/interpret-medication-image", async (req, res) => {
    try {
        const { imageBase64, mimeType } = req.body;

        if (!imageBase64) {
            return res.status(400).json({ error: "Kein Bild übergeben." });
        }

        const mime = mimeType || "image/jpeg";

        const messages = [
            {
                role: "system",
                content: `Du bist ein medizinischer Dokumentationsassistent.
Analysiere das Bild (z.B. Medikamentenpackung, Rezept, Beipackzettel) und extrahiere folgende Felder:

- name: Handelsname oder Wirkstoffname des Medikaments.
- dosage: Stärke/Dosierung (z.B. "500mg", "10mg/ml").

Regeln:
- Erfinde keine Informationen die nicht sichtbar sind.
- Lasse Felder leer ("") wenn die Information nicht erkennbar ist.
- Alle Strings müssen UTF-8-konform sein.`,
            },
            {
                role: "user",
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${mime};base64,${imageBase64}`,
                        },
                    },
                    {
                        type: "text",
                        text: "Extrahiere die Medikamenten-Felder aus diesem Bild.",
                    },
                ],
            },
        ];

        const extracted = await medicationModelWithFields.invoke(messages);

        const name = extracted.name;
        const dosage = extracted.dosage;
        console.log("💊 Name:", name);
        console.log("💊 Dosage:", dosage);

        return res.json({ extracted });

    } catch (error) {
        console.error("AI Medication Error:", error?.message || error);
        return res.status(500).json({ error: "KI-Service aktuell nicht erreichbar." });
    }
});


// ─── SERVER START ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Med-AI-Service läuft auf Port ${PORT}`);
    console.log(`   → POST /ai/explain (Mistral / Validator Loop)`);
    console.log(`   → POST /ai/interpret-medical-letter`);
    //console.log(`   → POST /ai/interpret-medication-image`);
});