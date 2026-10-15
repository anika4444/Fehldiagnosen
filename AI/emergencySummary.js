import { Router } from "express";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { createModel } from "./modelFactory.js";

const router = Router();
const model = createModel({ temperature: 0 });

const DISCLAIMER =
  "KI generiert. Ersetzt nicht die Originaldaten auf dieser Seite.";

// Short, factual and only from the given data. Read by rescue staff under time pressure.
const SYSTEM_PROMPT = `Du bist ein medizinischer Assistent für Rettungskräfte und Ärztinnen.
Du erhältst strukturierte Gesundheitsdaten einer Person ohne Namen.

REGELN:
1. Schreibe 3 bis 5 kurze Sätze als Fließtext, keine Überschriften, keine Listen, kein Markdown.
2. Nenne zuerst Medikamente mit besonderem Risiko, dann bekannte Erkrankungen, dann auffällige Symptome.
3. Verwende nur die gelieferten Daten. Erfinde nichts, ergänze keine Dosierungen und stelle keine Diagnosen.
4. Steht bei einem Abschnitt "nicht freigegeben", triff dazu keine Aussage, auch nicht, dass nichts vorliegt.
5. Ist die Wechselwirkungsprüfung nicht verfügbar oder wurden Medikamente nicht geprüft, schreibe niemals, dass keine Wechselwirkungen bestehen.
6. Fachsprache ist erlaubt, die Leser sind medizinisches Personal.
7. Schreibe Wörter aus statt sie abzukürzen, also "zum Beispiel" statt "z. B." und "circa" statt "ca.".
8. Keine Emojis, keine Anrede, keine Gedankenstriche.`;

const line = (parts) => parts.filter(Boolean).join(" | ");

// null means the category is not shared with this code, an empty array means nothing is recorded
const asList = (value) => (Array.isArray(value) ? value : null);

const NOT_SHARED = "nicht freigegeben";

const section = (list, render) => {
  if (list === null) return NOT_SHARED;
  if (list.length === 0) return "keine erfasst";
  return list.map(render).join("\n");
};

// "A", "A oder B", "A, B oder C"
const joinWithOr = (words) =>
  words.length <= 1
    ? words.join("")
    : `${words.slice(0, -1).join(", ")} oder ${words[words.length - 1]}`;

// The requirement allows 3 to 5 lines, so a longer answer is cut after the fifth sentence
const MAX_SENTENCES = 5;

// Private use character, never part of normal text
const PROTECTED_DOT = "";

const SINGLE_WORD_ABBREVIATIONS = [
  "bspw",
  "bzw",
  "ca",
  "dr",
  "etc",
  "evtl",
  "ggf",
  "inkl",
  "max",
  "med",
  "min",
  "mind",
  "nr",
  "prof",
  "sog",
  "std",
  "tägl",
  "usw",
  "vgl",
  "vs",
  "zzgl",
];

// Dots inside these never end a sentence, even though the prompt asks for full words
const ABBREVIATION_PATTERNS = [
  // Letter pairs like "z. B.", "d. h.", "u. a.", "i. v." or "p. o."
  /(?<!\p{L})\p{L}\.\s?\p{L}\./gu,
  new RegExp(`(?<!\\p{L})(?:${SINGLE_WORD_ABBREVIATIONS.join("|")})\\.`, "giu"),
  // Day before a month name, like "3. März"
  /(?<!\d)\d{1,2}\.(?=\s(?:Jan|Feb|Mär|Apr|Mai|Jun|Jul|Aug|Sep|Okt|Nov|Dez))/gu,
];

const protectAbbreviations = (text) =>
  ABBREVIATION_PATTERNS.reduce(
    (result, pattern) =>
      result.replace(pattern, (match) => match.replaceAll(".", PROTECTED_DOT)),
    text,
  );

const limitSentences = (text, max) => {
  const clean = protectAbbreviations(text.replace(/\s+/g, " ").trim());
  // A dot only ends a sentence before a space or at the end, so "2.5 mg" stays in one piece
  const sentences =
    clean.match(/(?:[^.!?]|[.!?](?=\S))+(?:[.!?]+(?=\s|$)|$)/g) ?? [];
  return sentences
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, max)
    .join(" ")
    .replaceAll(PROTECTED_DOT, ".");
};

const buildInteractionText = (interactions, isUnavailable, unchecked) => {
  if (isUnavailable)
    return "Prüfung nicht verfügbar, Wechselwirkungen sind unbekannt";
  if (interactions === null) return NOT_SHARED;

  const found = interactions.length
    ? interactions
        .map((i) => `- ${i.medicationA} und ${i.medicationB}: ${i.description}`)
        .join("\n")
    : "keine gefunden";

  return unchecked.length
    ? `${found}\nNicht geprüft, da ohne Datenbankzuordnung: ${unchecked.join(", ")}`
    : found;
};

router.post("/ai/emergency-summary", async (req, res) => {
  try {
    const body = req.body ?? {};
    const medications = asList(body.medications);
    const conditions = asList(body.conditions);
    const symptoms = asList(body.symptoms);
    const interactions = asList(body.interactions);
    const redFlags = asList(body.redFlags);
    const interactionsUnavailable = body.interactionsUnavailable === true;
    const uncheckedMedications = asList(body.uncheckedMedications) ?? [];

    // Only categories that are shared can be called empty
    const sources = [
      { list: medications, label: "Medikamente" },
      { list: conditions, label: "Erkrankungen" },
      { list: symptoms, label: "aktuellen Symptome" },
    ].filter((source) => source.list !== null);

    if (sources.length === 0) {
      return res.json({
        summary: "Für diese Zusammenfassung sind keine Daten freigegeben.",
        disclaimer: DISCLAIMER,
      });
    }

    if (sources.every((source) => source.list.length === 0)) {
      return res.json({
        summary: `Keine ${joinWithOr(sources.map((source) => source.label))} hinterlegt.`,
        disclaimer: DISCLAIMER,
      });
    }

    const medicationText = section(medications, (m) =>
      line([
        `- ${m.name}`,
        m.dosage && `Dosis ${m.dosage}`,
        m.intakeFrequency && `Einnahme ${m.intakeFrequency}`,
        m.indication && `wegen ${m.indication}`,
      ]),
    );

    const conditionText = section(conditions, (c) =>
      line([`- ${c.title}`, c.icdCode && `ICD ${c.icdCode}`, c.status]),
    );

    const symptomText = section(symptoms, (s) =>
      line([
        `- ${s.name}`,
        `Stärke ${s.intensity}/10`,
        s.occurredAt && `am ${String(s.occurredAt).slice(0, 10)}`,
        s.duration && `Dauer ${s.duration}`,
      ]),
    );

    const interactionText = buildInteractionText(
      interactions,
      interactionsUnavailable,
      uncheckedMedications,
    );

    const redFlagText = section(redFlags, (f) => `- ${f}`);

    const userPrompt = `MEDIKAMENTE:
${medicationText}

ERKRANKUNGEN:
${conditionText}

SYMPTOME DER LETZTEN 14 TAGE:
${symptomText}

WECHSELWIRKUNGEN:
${interactionText}

WARNHINWEISE:
${redFlagText}

Fasse das Wichtigste für die Erstversorgung zusammen.`;

    const aiMessage = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(userPrompt),
    ]);

    const summary = limitSentences(
      (aiMessage.content ?? "").toString(),
      MAX_SENTENCES,
    );

    res.json({ summary, disclaimer: DISCLAIMER });
  } catch (error) {
    // Only the message, never the request body: it contains health data
    console.error("Emergency summary error:", error.message);
    res.status(500).json({ error: "KI-Service aktuell nicht erreichbar." });
  }
});

export default router;
